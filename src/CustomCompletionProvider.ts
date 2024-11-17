import * as vscode from 'vscode';

class CustomCompletionProvider implements vscode.CompletionItemProvider{
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionList<vscode.CompletionItem> | vscode.CompletionItem[]> {
    
        console.log("+==========>");

     // 这里将生成并返回补全项列表
     const completionItems = [];

     // 获取当前光标所在行的文本内容
     const lineText = document.lineAt(position.line).text;

     // 假设我们针对特定的前缀提供补全，比如当前行以"myfunc"开头时提供补全
     if (lineText.startsWith('myfunc')) {
         const item1 = new vscode.CompletionItem('myfunc1');
         item1.insertText = 'myfunc1(arg1, arg2)';  // 设置插入文本，即用户选择该项后实际插入到编辑器的内容
         item1.kind = vscode.CompletionItemKind.Function;  // 设置补全项类型为函数
         item1.detail = '这是第一个自定义函数';
         item1.documentation = '这个函数用于实现特定功能，参数说明如下：arg1 表示参数 1，arg2 表示参数 2';
         completionItems.push(item1);

         const item2 = new vscode.CompletionItem('myfunc2');
         item2.insertText = 'myfunc2(arg)';
         item2.kind = vscode.CompletionItemKind.Function;
         item2.detail = '这是第二个自定义函数';
         item2.documentation = '这个函数用于执行其他特定功能，参数 arg 有相应的要求';
         completionItems.push(item2);
     }

     return completionItems;
    }
    resolveCompletionItem?(item: vscode.CompletionItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CompletionItem> {
        throw new Error('Method not implemented.');
    }
}

export default CustomCompletionProvider;