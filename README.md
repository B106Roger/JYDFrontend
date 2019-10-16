# 金銀島專案文件

### 開發環境

該專案由 [Angular CLI version 8.0.3.](https://github.com/angular/angular-cli) 生成, 並依賴於 [Angular Framework](https://angular.io/start)
建議先安裝 __angular/cli__ 以及套件
``` 
npm i @angular/cli -g
```
### 測試伺服器
在終端機中, 切換至當前目錄, 並執行 __ng serve__ 指令開啟測試伺服器,在 `http://localhost:4200/` 中, 應用程式將會於你修改Source Code時自動重新載入

### 原始碼 scaffolding

在終端機執行 __ng generate component [component-name]__ 產生 component 樣板文件 
亦可執行 __ng generate *[directive | pipe | service | class | guard | interface | enum | module]*__ 產生相關樣板文件

### 建置專案
執行 __ng build__ 建置該專案, 生成的文件將會被儲存於根目錄的 `dist/` 資料夾之下。
產品建議使用 __ng build  --prod__, 會進行原始碼壓縮

### 單元測試
執行 __ng test__ 指令來透過 [Karma](https://karma-runner.github.io) 進行單元測試

### 執行 end-to-end 測試
執行 __ng e2e__ 指令來透過 [Protractor](http://www.protractortest.org/) 進行 end-to-end 測試

### 其他協助
執行 `ng help` 旨指令取得更多 Angular CLI 協助或是檢閱 [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

* * *
### 開始之前

請確定您的電腦有安裝 npm 軟體, 並執行 __npm install__ 下載相依開發函式庫
* * *
### 專案結構

以下條列較重要之文件與目錄
``` c
[Root]
+ document
    - Game.md
    - Language.md
    - Webp.md
+ e2e
    + src
    - protractor.conf.js
    - tsconfig.json
+ node_modules
+ src
    + app
        + component
        + service
        - app-routing.module.ts
        - app.component.html
        - app.component.scss
        - app.component.spec.ts
        - app.component.ts
        - app.module.ts
        - env.ts
        - game-pipe.pipe.spec.ts
        - game-pipe.pipe.ts
    + assets
        + i18n
        + icons
        + imgs
        + splash
        - music_lobbybg.m4a
        - music_lobbybg.mp3
        - music_lobbybg.wav
    + environments
    + public
    - favicon.ico
    - index.html
    - main.ts
    - manifest.webmanifest
    - polyfills.ts
    - styles.scss
    - test.ts
- angular.json
- ngsw-config.json
- package.json
- README.md
    .
    .
    .
```
* * *
### Document 目錄
該目錄放置與金銀島部屬相關之說明文件，如遊戲、語系、伺服器部屬等相關設定
* * *

### e2e 目錄
該目錄放置 end-to-end 測試相關文件, 詳細資料檢閱 [Protractor](http://www.protractortest.org/) 之說明
* * *

### node_modules 目錄
該目錄放置專案開發的相依函式庫, 由 __npm install__ 指令產生
* * *

# src 目錄
該目錄放置原始碼與相關資源, 說明如下
### src/app/component 目錄
    指令: ng generate component component/{component-name}

    每個 component 就是一個html頁面, 該目錄底下有諸多資料夾, 每個皆涵蓋component之定義
    [Component-name directory]
        {Component-name}.html 定義元件之文件結構, 如超連結、圖片、版面配置等
        {Component-name}.ts   定義元件之資料繫結, 如Event Handler、Service(語系、路由), 根據 Angular 官方文件實作相關細節
        {Component-name}.scss 定義元件之樣式, 如文字顏色、背景圖片等
        {Component-name}.spec.ts 定義元件之測試
    
    Component 包含生命週期、顯示邏輯、資料模型等
相關資料可參考 [Component Document](https://angular.io/guide/displaying-data)
### src/app/service 目錄
    指令: ng generate services services/{services-name}

    由於每個 Component 皆為一個獨立類別, Angular 提供了一個可重複使用程式代碼的機制-服務(Service),
    Service 類別內所宣告的屬性與方法可以讓不同類別使用。

    其中包含:
        fetch.service.ts      定義 API 呼叫以及與 Server 驗證相關功能
        auth-guard.service.ts 定義 用戶驗證功能, 如是否登入、資料加密
        auto-guard.service.ts 定義 用戶登入檢查, 如自動登入、自動跳轉等

    Service 可以大幅減低程式碼耦合度, 並提取出複用的程式碼
相關資料可參考 [Service Document](https://angular.io/guide/singleton-services)

### src/app/app-routing.module.ts
    該檔案描述專案的路由關係, 亦即URL 與 顯示元件的對應關係, 一個合法的路由定義為:
    {
        path: 對應URL,
        component: 顯示元件,
        canActivate: [ 服務 ]
    }
    其中canActivate 為可選參數, 在service 實作 canActivate介面, 功能是進入元件前呼叫定義的canActivate()函式
    若 canActivate() 回傳值為 false, 則重導回上一個頁面, 反之則顯示該元件
相關資料可參考 [Router Document](https://angular.io/guide/router)

### src/app/app.module.ts
    該檔案描述專案所需的所有 Service、Module、Component, 可能的描述為
    @NgModule({
        declarations: [
            元件
            .
            .
            .
        ],
        imports: [
            模組
            .
            .
            .
        ],
        providers: [
            服務
            .
            .
            .
        ],
    }),
    載入NgModule前, 需先使用 import 語法載入所使用的類別
相關資料可參考 [NgModule Document](https://angular.io/api/core/NgModule)

### src/app/app.component.ts , src/app/app.component.html , src/app/app.component.scss
    其作用即是 app component, 與上方的 component 說明相同, 定義 app元件的事件、顯示等

### src/app/env.ts
    該處宣告應被呼叫的 API 定義, 如URL、Html Method、return Data等
    若要在其他元件、服務中使用，需要 import 該檔案

### src/assets 目錄
    該處放置專案所需的靜態資源, 如圖片、語系翻譯、影音檔案等
    其中又分為:
     - i18n目錄: 放置語系的翻譯檔, 以語系縮寫命名的json檔,如 en.json、zh-tw.json等

     - icons目錄: 放置App icon等會使用到 icons圖檔, 建議須放置多個解析的圖檔,用以讓應用程式選擇最佳顯示解析度

     -imgs目錄: 放置專案所用到的圖片檔案, 直接置放於 imgs 下的圖檔通常是沒有文字、不分語系的圖檔,
     而 imgs/en、imgs/es 等，則放置與語系相依的相關文件

     -splash目錄: 打開 PWA 的時候會看到的一個Load畫面, 其用到的圖檔放置處

PWA 的相關資訊, 可參考 [PWA Guideline](https://developers.google.com/web/fundamentals/codelabs/your-first-pwsrc/app/)
語系設定可參考 [Language Document](document/Language.md)
語系設定可參考 [Webp Document](document/Webp.md)

### src/environments 目錄
    環境組態(開發、產品)設定, 相關資訊可直接查看該目錄下的檔案
可參考 [Environment Document](https://angular.io/guide/build)

### src/public 目錄
    該目錄放置額外的第三方 JavaScript Library, 或是額外的 css 樣式檔案

### src/index.html
    網站的主要入口，到時候編譯時會把所有資源整合後插入到該檔案中

### src/main.ts
    定義該App要載入那些模組

### src/manifest.webmanifest
    PWA 相關的組態設定
可參考 [Manifest MDN](https://developer.mozilla.org/zh-TW/docs/Web/Manifest)

* * *
# 根目錄

### package.json
    描述該專案相關資訊, 可能的內容為
    {
        "name": 應用程式名稱,
        "version": 版本號,
        "scripts": {
            命令
            .
            .
            .
        },
        "dependencies": {
            套件名稱
            .
            .
            .
        },
        "devDependencies": {
            套件名稱
            .
            .
            .
        }
    }
    - dependencies 為產品會使用到的套件, 
    - devDependencies 則是僅在開發期間需要的套件, 如測試伺服器、Debugger等
    - scripts 則是npm可用的指令, 可使用 npm run [script-name] 來執行
###### __除版本號、應用程式名稱、命令等, 該檔案不應手動設定, 而是透過npm修改__


### angular.json
    該檔案定義 angular 開發組態, 如Application 進入點, 全域Library、Style等
    或是諸如build 輸出目錄, webpack 測試伺服器組態等, 皆在該檔案中定義

###### __除非特殊設定,否則該檔案不會被修改__
可參考 [Angular Config](https://angular.io/guide/workspace-config)