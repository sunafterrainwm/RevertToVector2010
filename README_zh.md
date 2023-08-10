RevertToVector2010
====
在使用者未登入 WMF wikis 時重寫網址以強制使用舊版 Vector 外觀。

[English](README.md)

2023年，維基媒體基金會陸續將各個旗下的維基計畫的預設外觀換成 Vector 2022，可以參考[中文維基百科上關於更新成 Vector 2022 的介紹](https://zh.wikipedia.org/wiki/Wikipedia:Vector_2022)。雖然 Vector 2022 的確有它的優勢，但許多人難以適應其設計。

這個 UserScript 可以讓你在沒有登入的情況下強制載入以前的外觀 Vector 2010。

## 安裝方法
一般：
https://raw.githubusercontent.com/sunafterrainwm/RevertToVector2010/master/RevertToVector2010.user.js

同時重寫頁面中的所有連結的版本：
https://raw.githubusercontent.com/sunafterrainwm/RevertToVector2010/master/RevertToVector2010-extend.user.js

後者可以讓你在點選其他條目的連結時少載入一次頁面

## 已知限制與提醒
1. 登入使用者請到偏好設定更改預設外觀。
2. 目前僅確定可以在 Tampermonkey 上使用。
