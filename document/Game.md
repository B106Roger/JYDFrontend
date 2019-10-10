**串接JYD Lobby遊戲**
===
# Step 1 - 將遊戲icon重新命名

### 請將遊戲icon依照[Game List](https://dev-slot-mario.gd888.cc/gamelab/gamelist) 提供之DisplayName命名為
```jsx=
`pic_game_iconS_${DisplayName}_${語系名稱}.png`  // normal game圖示
`pic_game_iconL_${DisplayName}_${語系名稱}.png`  // hot    game圖示
```

### 例如: 在 GameList 提供的其中一個遊戲資訊中
```json
{
    "DisplayName": "soccerfever",
    "GameName": "gamelab-soccerfever",
    "GameType": "slot",
    "Orientation": "portrait",
    "Priority": 1,
    "URL": "https://dev-slot-mario.gd888.cc/gamelab/"
}
```
**足球狂熱**這個遊戲的icon名稱在**英文語系**下就必須命名為
```jsx=
`pic_game_iconS_soccerfever_en.png`  // normal game圖示
`pic_game_iconL_soccerfever_en.png`  // hot    game圖示
```


----

# Step 2 - 將遊戲icon檔案新增至語系檔案中
### 圖片放置目錄(bundle 完後的目錄)
    JYDFrontend/
        assets/
            imgs/
                en/
                es/
                pt/
                zh-cn/

請將遊戲icon放置到各語系目錄下(en、es、pt、zh-cn)
<span style="color:red">請記住在不同語系資料夾下的遊戲icon，要替換成對的語系名稱。</span>


### **語系名稱** 直接用語系目錄名稱替換，如:
     pic_game_iconS_soccerfever_en.png           // 放在en 資料夾下
     pic_game_iconS_soccerfever_es.png           // 放在es 資料夾下
     pic_game_iconS_soccerfever_pt.png           // 放在pt 資料夾下
     pic_game_iconS_soccerfever_zh-cn.png        // 放在zh-cn 資料夾下
----

# Step 3 - 將遊戲script 新增至遊戲目錄中
### 1. 遊戲放置目錄

請將遊戲放置於JYDFrontend/assets/Games下，並且目錄名稱以DisplayName命名

足球狂熱的資料夾就應該以以下方式命名

    JYDFrontend/assets/Games/soccerfever/
                    
而且裡面一定要有index.html，是為遊戲的進路口，如:

    JYDFrontend/assets/Games/soccerfever/index.html
### 2. 微調index.html內容
而且index.html在任何script load前一定要加入以下 inline script:
```jsx=
// 通常放在document.head的部分
var GAME_NAME = parent.window['_GameName'];
var GAME_URL  = parent.window['_GameUrl'];
var BEARER    = parent.window['_Bearer'];
```

以下為soccerfever/index.html 範例:
```htmlembedded=
<!DOCTYPE html>

<html>
<head>
	<meta charset="utf-8">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,maximum-scale=1">
	<meta name="description" content="88Fortunes by Grandpeak Technology Ltd.">
	<meta name="theme-color" content="#000000">
	<script>
    var GAME_URL   = parent.window['_GameUrl'];
    var BEARER     = parent.window['_Bearer'];
    var GAME_NAME  = parent.window['_GameName'];
	</script>
	<link rel="icon" type="image/png" sizes="142x142" href="favicon.png">
	<link rel="apple-touch-icon" sizes="142x142" href="favicon.png">
	<link rel="apple-touch-icon-precomposed" sizes="142x142" href="favicon.png">
	<style>*,::after,::before{margin:0;padding:0;box-sizing:inherit}body{min-height:100vh;min-width:1024px;width:100%;overflow:hidden;top:0;left:0;box-sizing:border-box}#game{position:absolute;top:0;left:0;width:inherit;height:100vh}</style>
	<title>Soccerfever</title>
	<script src="./library.bundle.js?version=1.0.0"></script>
	<script src="./engine.bundle.js?version=1.0.0"></script>
	<script src="./soccerfever/content.bundle.js?version=1.0.0"></script>
</head>
<body>
    <body style="background-color:#000">
	<div id="game" style="position:fixed">
		<div id="scroll"></div>
	</div>
</body>
</body></html>
```

----
1. 此教學為 在lobby被bundle的狀況下新增遊戲，意思是不用改到JYDFrontend source code的狀況下即可成功新增遊戲
2. 原文連結: https://hackmd.io/5vWBuJ7PQyW3QB96kpbzvQ?both