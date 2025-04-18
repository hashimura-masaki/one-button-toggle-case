# one-button-toggle-case

`one-button-toggle-case`は、選択したテキストのケーススタイルを簡単に切り替えることができるVisual Studio Code拡張機能です。サポートされているケーススタイルには、以下が含まれます：

- lowerCamelCase
- UpperCamelCase
- snake_case
- SCREAMING_SNAKE_CASE
- kebab-case
- SCREAMING-KEBAB-CASE

## 特徴

- 選択したテキストのケーススタイルを自動的に検出し、次のスタイルに変換します。
- 一度に複数の選択範囲を処理可能（最大10箇所まで）。
- 無効な文字や長すぎるテキストを検出し、ユーザーに通知します。

## 使用方法

1. テキストエディタで変換したいテキストを選択します。
2. コマンドパレット（`Ctrl+Shift+P`または`Cmd+Shift+P`）を開き、`One Button Toggle Case: Toggle Case`を実行します。
3. または、以下のキーバインドを使用してコマンドを実行します：
   - **Windows/Linux**: `Ctrl+Alt+Q`
   - **Mac**: `Cmd+Alt+Q`
4. 選択したテキストが次のケーススタイルに変換されます。

## 要件

- Visual Studio Codeがインストールされている必要があります。
- Node.jsがインストールされている必要があります。

## 制限事項

- 一度に処理できる選択範囲は最大10箇所です。
- 選択範囲が空、または100文字を超える場合は処理されません。
- 無効な文字（英数字、アンダースコア、ハイフン以外）が含まれる場合は処理されません。

## 拡張機能の設定

この拡張機能には特定の設定項目はありません。

## 既知の問題

- 現在のところ、単語の分割や結合のロジックが完全ではない場合があります。

## リリースノート

### 1.0.0

- 初期リリース。

## 開発者向け情報

この拡張機能のコードは、`src/extension.ts`に実装されています。拡張機能の動作をカスタマイズしたい場合は、このファイルを編集してください。

---