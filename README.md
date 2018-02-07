# vue-vuex-modal-boilerplate

## Introduction

このリポジトリはVue/Vuexを用いてモーダルを管理するためのテンプレです。
モーダル管理のモジュールは「modal」という名称で作成しています。

modalモジュールには以下の機能を実装しています。

- コールバックを渡せる
- optionによりDeferredを返すようになる
- モーダルの前後遷移ができる
- モーダルの履歴を追える

履歴を追える部分は`vue-router`のメソッドを参考にしています。

### callback & Deferred resolve/rejectのタイミング

`actions.resolve` `actions.reject` が実行されるタイミングまで、
すべてのcallbackやDeferred resolve/rejectは実行されません。

TODO: callbackに関してはcurrentIndexが移動したタイミングで実行するように指定できるようにするか検討

## State Structure

- modalNames: Array
- modalParams: Array
- currentIndex: Number
- transitionName: String
- callback: null || Function
- deferred: null || Function

## Examples

### Methods

`push`

```javascript
store.dispatch('modal/push', {
  name: 'ModalName',
  params: {},
  callback: (err, data) => {
    if (err){
       // if error
    }
  }
})
```

`push` 時にはモーダルの情報がState内に履歴保存されいていきます。  
保存されたデータは `close` `resolve` `reject` 時に削除されます。

もしDeferredを用いてフィードバック時の実装をしたい場合

```javascript
const dfd = store.dispatch('modal/push', {
  name: 'ModalName',
  params: {},
  dfd: true // This option is a flag for return 'Deferred'.
})

dfd.then(data => {
}).catch(err => {
});
```

`replace`

現在のモーダルを差し替えます。

```javascript
store.dispatch('modal/replace', {
  name: 'ModalName',
  params: {},
  callback: () => {
  },
  dfd: false
})
```

`close`

```javascript
store.dispatch('modal/close');
```

※ `modal/close`はコールバックやDeferredのresolve/rejectを実行しません。

`resolve`

もしcallback、またはDeferredのresolveを実行したい場合。

```javascript
store.dispatch('modal/resolve', { data });
```

`reject`

もしcallback、またはDeferredのrejectを実行したい場合。

```javascript
store.dispatch('modal/reject', { err });
```

`go`

履歴でモーダル遷移したい場合。  
遷移に指定した先にモーダルがない場合、`console.warm`で注意メッセージが表示され、  
何も動作しません。

```javascript
store.dispatch('modal/go', -2); // 2つ戻る
store.dispatch('modal/go', -1); // 1つ戻る
store.dispatch('modal/go', 1); // 1つ進む
store.dispatch('modal/go', 2); // 1つ進む
```

`forward`

```javascript
store.dispatch('modal/forward'); // 1つ進む
// store.dispatch('modal/go', 1); // これと同義
```

`back`

```javascript
store.dispatch('modal/back'); // 1つ戻る
// store.dispatch('modal/go', -1); // これと同義
```
