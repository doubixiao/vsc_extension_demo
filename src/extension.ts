// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import CustomCompletionProvider from './CustomCompletionProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from helloworld!');

		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			console.log("文档语言: ", document.languageId);
			console.log("文档版本: ", document.version);
		}

		// chooseOptionFromUser();
		readFileContent();

		writeFileContent();
    
	});

    const provider = new CustomCompletionProvider();
    const selector = { language: 'javascript' }; // 这里同样以 JavaScript 为例，根据实际针对的语言修改
    const disposable1 = vscode.languages.registerCompletionItemProvider(selector, provider, '.');
	context.subscriptions.push(disposable, disposable1);
}


function chooseOptionFromUser() {
    const options = ['选项1', '选项2', '选项3'];
    vscode.window.showQuickPick(options, {
        canPickMany: false, // 设置是否可以多选，这里设置为只能单选
        placeHolder: '请选择一个选项',
    }).then((selectedOption) => {
        if (selectedOption) {
            // 根据用户选择的选项进行相应的操作
            vscode.window.showInformationMessage(`你选择了: ${selectedOption}`);
        }
    });
}


function readFileContent() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
	console.log("workspaceFolders====>", workspaceFolders);
    if (workspaceFolders) {
        const fileUri = vscode.Uri.joinPath(workspaceFolders[0].uri, 'README.md');
        return vscode.workspace.fs.readFile(fileUri).then((data) => {
            // 将字节数组转换为字符串
            const content = new TextDecoder('utf-8').decode(data);
            console.log('文件内容:', content);
            return content;
         });
    }
}



function writeFileContent() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        const fileUri = vscode.Uri.joinPath(workspaceFolders[0].uri, 'newFile.txt');
        const content = '这是要写入文件的内容';
        const encoder = new TextEncoder();
        const data = encoder.encode(content);
        return vscode.workspace.fs.writeFile(fileUri, data).then(() => {
            console.log('文件写入成功');
        });
    }
}

// This method is called when your extension is deactivated
export function deactivate() {}
