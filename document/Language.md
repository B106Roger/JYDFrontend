**JYD Lobby 新增語系**
===
# Step 1 - 新增語系相關檔案

## 1. 在JYDFrontend/src/assets/i18n/ 下新增語系json檔

範例語系檔 eng.json
```jsonld
{
  "login": {
    "rememberMe": "REMEMBER ME",
    "account_holder": "PLAYER ID",
    "password_holder": "PASSWORD",
    "loginbtn": "/assets/imgs/eng/btnLoginNormal.png",
    "loginbtnpressed": "/assets/imgs/eng/btnLoginPressed.png",
    "mainicon": "/assets/imgs/eng/picLogo@2x.png",
    "loginfailmsg": "/assets/imgs/eng/picMsgLoginFailed@2x.png",
    "loginfailconfirm": "/assets/imgs/eng/btnConfirmNormal@2x.png",
    "loginfailpress": "/assets/imgs/eng/btnConfirmPressed@2x.png",
    "installHint": "assets/imgs/eng/picInstallationGuide.png",
    "installconfirm": "/assets/imgs/eng/btnInstallNormal.png",
    "installpressed": "/assets/imgs/eng/btnInstallPressed.png",
    "installMsg": "Do not show notifications"
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
    "hotGameTag": "/assets/imgs/eng/picTagHotGame.png",
    "logoutMessage" :"ARE YOU SURE YOU WANT TO QUIT?",

    "lobbyimg": "/assets/imgs/eng/btnLobbyNormal@2x.png",
    "historyimg": "/assets/imgs/eng/btnHistoryNormal@2x.png",
    "accountimg": "/assets/imgs/eng/btnAccountNormal@2x.png",
    "contactimg": "/assets/imgs/eng/btnContactNormal@2x.png",
    "lobbyimgpressed": "/assets/imgs/eng/btnLobbyPressed@2x.png",
    "historyimgpressed": "/assets/imgs/eng/btnHistoryPressed@2x.png",
    "accountimgpressed": "/assets/imgs/eng/btnAccountPressed@2x.png",
    "contactimgpressed": "/assets/imgs/eng/btnContactPressed@2x.png",
    "onimg": "/assets/imgs/eng/btnMusicOn@2x.png",
    "offimg": "/assets/imgs/eng/btnMusicOff@2x.png",
    "yesImgNormal" :  "/assets/imgs/eng/btnLogoutYesNormal@2x.png",
    "noImgNormal" :   "/assets/imgs/eng/btnLogoutNoNormal@2x.png",
    "yesImgPressed" : "/assets/imgs/eng/btnLogoutYesPressed@2x.png",
    "noImgPressed" :  "/assets/imgs/eng/btnLogoutNoPressed@2x.png"
  },

  "contact" : {
    "title" : "CONTACT US",
    "titleImg" : "/assets/imgs/eng/picTitleContactTxt@2x.png",
    "label" : "/assets/imgs/eng/btnLabelContactusPressed@2x.png",
    "REACH US WITH FOLLOWING CONTACT DETAILS" : "REACH US WITH FOLLOWING CONTACT DETAILS",
    "email-icon"    : "/assets/imgs/eng/iconContactEmail@3x.png",
    "phone-icon"    : "/assets/imgs/eng/iconContactPhone@3x.png",
    "whatsApp-icon" : "/assets/imgs/eng/iconContactWhatsapp@3x.png",
    "weChat-icon"   : "/assets/imgs/eng/iconContactWechat@3x.png",
    "line-icon"     : "/assets/imgs/eng/iconContactLine@3x.png"
  },

  "account" : {
    "title" : "ACCONUT",
    "titleImg" : "/assets/imgs/eng/picTitleAccountTxt@2x.png",
    "label" : "/assets/imgs/eng/btnLabelResetPwPressed@2x.png",
    "RESET PASSWORD" : "RESET PASSWORD",
    "CURRENT PASSWORD" : "CURRENT PASSWORD",
    "NEW PASSWORD" : "NEW PASSWORD",
    "CONFIRM NEW PASSWORD" : "CONFIRM NEW PASSWORD",
    "saveImgNormal"    : "/assets/imgs/eng/btnAccountSaveNormal@2x.png",
    "cancelImgNormal"  : "/assets/imgs/eng/btnAccountCancelNormal@2x.png",
    "saveImgPressed"   : "/assets/imgs/eng/btnAccountSavePressed@2x.png",
    "cancelImgPressed" : "/assets/imgs/eng/btnAccountCancelPressed@2x.png"
  },

  "history" : {
    "title" : "HISTORY",
    "titleImg" : "/assets/imgs/eng/picTitleHistoryTxt@2x.png",
    "time" : "TIME",
    "to" : "TO",
    "goImgNormal"  : "/assets/imgs/eng/btnHistoryGoNormal@2x.png",
    "goImgPressed" : "/assets/imgs/eng/btnHistoryGoPressed@2x.png",
    "labelGameHistoryNormal"  : "/assets/imgs/eng/btnLabelGameHistoryNormal@2x.png",
    "labelGameHistoryPressed" : "/assets/imgs/eng/btnLabelGameHistoryPressed@2x.png",
    "labelInOutHistoryNormal"  : "/assets/imgs/eng/btnLabelInoutHistoryNormal@2x.png",
    "labelInOutHistoryPressed" : "/assets/imgs/eng/btnLabelInoutHistoryPressed@2x.png",
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



## 2. 在JYDFrontend/src/assets/imgs/目標語系/   下新增圖片檔


### <span style="color:red">1. imgs下的語系資料夾名稱務必跟i18n/ 下的json檔名稱相同</span>
例如中文語系的Json檔名為: 

    JYDFrontned/src/assets/imgs/i18n/sch.json     // 文字相關語系檔
    
則在imgs下的資料夾名稱為

    JYDFrontend/src/assets/imgs/sch               // 裡面都放語系相關圖片

### 2. 遊戲圖片名稱
```jsx=
`pic_game_iconS_${DisplayName}.png`  // normal game圖示
`pic_game_iconL_${DisplayName}.png`  // hot    game圖示
```

### 3. 其他
請以json檔的內容新增語系圖片

## 3. 在JYDFrontend/src/assets/imgs 下新增國旗圖片

檔名以:
```jsx=
`iconLan${語系名稱}`
```
並至於 JYDFrontend/src/assets/imgs/ 下

----

# Step 2 - 更改source code

### 1. JYDFrontend/src/component/login/login.component.ts
以下為Login.component.ts Line 22 開始的內容
```typescript=
langList = [
    {
      lang: 'eng',                         // 語系名稱，應與語系資料夾有相同的命名
      img: '/assets/imgs/iconLanEn.png',   // 語系國旗位置
      label: 'ENGLISH'                     // Login 頁面所顯示的語系字串
    },
    {
      lang: 'sch',
      img: '/assets/imgs/iconLanSc.png',
      label: '简体中文'
    },
    {
      lang: 'esp',
      img: '/assets/imgs/iconLanEs.png',
      label: 'Español'
    },
    {
      lang: 'por',
      img: '/assets/imgs/iconLanPo.png',
      label: 'Português'
    }
  ];
```
將其中一個語系換成你要的並填寫好lang、img、label 這三個位置

### 2. JYDFrontend/src/component/app.component.ts
以下為app.component.ts Line 22 開始的內容
```typescript=
translate.addLangs(['eng', 'sch', 'esp', 'por']);     // 預使用的語系列表
const defaultLang = 'eng';                            // 預設語系
```
替換語系列表的內容來更換你要的語系
<span style="color: red">預設語系務必出現在語系列表中</span>

# Step 3 - Bundle 專案
### 1. ng build --prod
### 2. 將bundle專案放到server上
### 3. 記得在JYDFrontend/assets/imgs 目錄下執行以下程式碼以產生webp圖檔
### 4. 將遊戲目錄mklink 到JYDFrontend/assets/Games

----
原文連結: https://hackmd.io/P5c1kPgMR_KlIhG4Cbe0yg?both