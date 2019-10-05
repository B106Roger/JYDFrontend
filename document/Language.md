**JYD Lobby 新增語系**
===
# Step 1 - 新增語系相關檔案

## 1. 在JYDFrontend/src/assets/i18n/ 下新增語系json檔

範例語系檔 en.json
```jsonld
{
  "login": {
    "rememberMe": "REMEMBER ME",
    "account_holder": "PLAYER ID",
    "password_holder": "PASSWORD",
    "loginbtn": "/assets/imgs/en/btnLoginNormal.png",
    "loginbtnpressed": "/assets/imgs/en/btnLoginPressed.png",
    "mainicon": "/assets/imgs/en/picLogo@2x.png",
    "loginfailmsg": "/assets/imgs/en/picMsgLoginFailed@2x.png",
    "loginfailconfirm": "/assets/imgs/en/btnConfirmNormal@2x.png",
    "loginfailpress": "/assets/imgs/en/btnConfirmPressed@2x.png",
    "installHint": "assets/imgs/en/picInstallationGuide.png",
    "installconfirm": "/assets/imgs/en/btnInstallNormal.png",
    "installpressed": "/assets/imgs/en/btnInstallPressed.png"
  },
  "lobby": {
    "all": "ALL",
    "slot": "SLOT",
    "mario": "MARY SLOTS",
    "poker": "POKER GAMES",
    "setting": {
      "music": "MUSIC",
      "sounds": "SOUNDS",
      "version": "VERSION",
      "download": "DOWNLOAD APP",
      "logout": "LOGOUT",
      "on" : "ON",
      "off": "OFF"
    },
    "hotGameTag": "/assets/imgs/en/picTagHotGame.png",
    "logoutMessage" :"ARE YOU SURE YOU WANT TO QUIT?",

    "lobbyimg": "/assets/imgs/en/btnLobbyNormal@2x.png",
    "historyimg": "/assets/imgs/en/btnHistoryNormal@2x.png",
    "accountimg": "/assets/imgs/en/btnAccountNormal@2x.png",
    "contactimg": "/assets/imgs/en/btnContactNormal@2x.png",
    "lobbyimgpressed": "/assets/imgs/en/btnLobbyPressed@2x.png",
    "historyimgpressed": "/assets/imgs/en/btnHistoryPressed@2x.png",
    "accountimgpressed": "/assets/imgs/en/btnAccountPressed@2x.png",
    "contactimgpressed": "/assets/imgs/en/btnContactPressed@2x.png",
    "onimg": "/assets/imgs/en/btnMusicOn@2x.png",
    "offimg": "/assets/imgs/en/btnMusicOff@2x.png",
    "yesImgNormal" :  "/assets/imgs/en/btnLogoutYesNormal@2x.png",
    "noImgNormal" :   "/assets/imgs/en/btnLogoutNoNormal@2x.png",
    "yesImgPressed" : "/assets/imgs/en/btnLogoutYesPressed@2x.png",
    "noImgPressed" :  "/assets/imgs/en/btnLogoutNoPressed@2x.png"
  },

  "download-app" : {
    "title" : "DOWNLOAD APP",
    "titleImg" : "/assets/imgs/en/picTitleDownloadTxt@2x.png",
    "label" : "/assets/imgs/en/btnLabelDownloadPressed@2x.png",
    "download" : "DOWNLOAD",
    "TREASURE ISLAND" : "TREASURE ISLAND",
    "downloadImgNormal" : "/assets/imgs/en/btnDownloadNormal@2x.png",
    "downloadImgPressed" : "/assets/imgs/en/btnDownloadPressed@2x.png"
  },

  "contact" : {
    "title" : "CONTACT US",
    "titleImg" : "/assets/imgs/en/picTitleContactTxt@2x.png",
    "label" : "/assets/imgs/en/btnLabelContactusPressed@2x.png",
    "REACH US WITH FOLLOWING CONTACT DETAILS" : "REACH US WITH FOLLOWING CONTACT DETAILS",
    "email-icon"    : "/assets/imgs/en/iconContactEmail@3x.png",
    "phone-icon"    : "/assets/imgs/en/iconContactPhone@3x.png",
    "whatsApp-icon" : "/assets/imgs/en/iconContactWhatsapp@3x.png",
    "weChat-icon"   : "/assets/imgs/en/iconContactWechat@3x.png",
    "line-icon"     : "/assets/imgs/en/iconContactLine@3x.png"
  },

  "account" : {
    "title" : "ACCONUT",
    "titleImg" : "/assets/imgs/en/picTitleAccountTxt@2x.png",
    "label" : "/assets/imgs/en/btnLabelResetPwPressed@2x.png",
    "RESET PASSWORD" : "RESET PASSWORD",
    "CURRENT PASSWORD" : "CURRENT PASSWORD",
    "NEW PASSWORD" : "NEW PASSWORD",
    "CONFIRM NEW PASSWORD" : "CONFIRM NEW PASSWORD",
    "saveImgNormal"    : "/assets/imgs/en/btnAccountSaveNormal@2x.png",
    "cancelImgNormal"  : "/assets/imgs/en/btnAccountCancelNormal@2x.png",
    "saveImgPressed"   : "/assets/imgs/en/btnAccountSavePressed@2x.png",
    "cancelImgPressed" : "/assets/imgs/en/btnAccountCancelPressed@2x.png"
  },

  "history" : {
    "title" : "HISTORY",
    "titleImg" : "/assets/imgs/en/picTitleHistoryTxt@2x.png",
    "time" : "TIME",
    "to" : "TO",
    "goImgNormal"  : "/assets/imgs/en/btnHistoryGoNormal@2x.png",
    "goImgPressed" : "/assets/imgs/en/btnHistoryGoPressed@2x.png",
    "labelGameHistoryNormal"  : "/assets/imgs/en/btnLabelGameHistoryNormal@2x.png",
    "labelGameHistoryPressed" : "/assets/imgs/en/btnLabelGameHistoryPressed@2x.png",
    "labelInOutHistoryNormal"  : "/assets/imgs/en/btnLabelInoutHistoryNormal@2x.png",
    "labelInOutHistoryPressed" : "/assets/imgs/en/btnLabelInoutHistoryPressed@2x.png",
    "GAME HISTORY" : "GAME HISTORY",
    "IN/OUT HISTORY" : "IN/OUT HISTORY",
    "gameRecord" : {
      "game" : "GAME",
      "dateTime" : "DATE/TIME",
      "bet" : "BET" ,
      "win" : "WIN" ,
      "beginMoney" : "START AMOUNT",
      "endMoney" : "END AMOUNT"
    } ,

    "inoutRecord" : {
      "no" : "NO.",
      "dateTime" : "DATE/TIME",
      "before" : "BEFORE",
      "inout" : "IN/OUT",
      "after" : "AFTER"
    }
  }
}

```



## 2. 在JYDFrontend/src/assets/imgs/語系名/ 下新增圖片檔

### <span style="color:red">1. 請注意只有遊戲圖片名稱最後要加語系名稱</span>
```jsx=
`pic_game_iconS_${DisplayName}_${語系名稱}.png`  // normal game圖示
`pic_game_iconL_${DisplayName}_${語系名稱}.png`  // hot    game圖示
```
### <span style="color:red">2. imgs下的語系資料夾名稱務必跟i18n/ 下的json檔名稱相同</span>
例如中文語系的Json檔名為: 

    JYDFrontned/src/assets/imgs/i18n/zh-cn.json     // 文字相關語系檔
    
則在imgs下的資料夾名稱為

    JYDFrontend/src/assets/imgs/zh-cn               // 裡面都放語系相關圖片


## 3. 在JYDFrontend/src/assets/imgs 下新增國旗圖片

檔名以:
```jsx=
`iconLan${語系名稱}`
```
並至於 JYDFrontend/src/assets/imgs下

----

# Step 2 - 更改source code

### 將JYDFrontend/src/component/login/login.component.ts中 Line 22 開始
```typescript=
langList = [
    {
      lang: 'en',                          // 語系名稱，應與語系資料夾有相同的命名
      img: '/assets/imgs/iconLanEn.png',   // 語系國旗位置
      label: 'ENGLISH'                     // Login 頁面所顯示的語系字串
    },
    {
      lang: 'zh-cn',
      img: '/assets/imgs/iconLanSc.png',
      label: '简体中文'
    },
    {
      lang: 'es',
      img: '/assets/imgs/iconLanEs.png',
      label: 'Español'
    },
    {
      lang: 'pt',
      img: '/assets/imgs/iconLanPo.png',
      label: 'Português'
    }
  ];
```
將其中一個語系換成你要的並填寫好lang、img、label 這三個位置


# Step 3 - Bundle 專案
### 1. ng build --prod
### 2. 將bundle專案放到server上
### 3. 記得在JYDFrontend/assets/imgs 目錄下執行以下程式碼以產生webp圖檔
### 4. 將遊戲目錄mklink 到JYDFrontend/assets/Games

----
原文連結: https://hackmd.io/P5c1kPgMR_KlIhG4Cbe0yg?both