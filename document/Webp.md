**新增webp 圖片**
===
# OS-Windows

## Step 1. 下載webp套件

### 請到以下連結下載webp套件
    https://storage.googleapis.com/downloads.webmproject.org/releases/webp/index.html

如果不知道下載的版本請參考Google的[說明](https://developers.google.com/speed/webp/docs/precompiled?hl=zh-TW)

## Step 2. 解壓縮與設定環境變數

### 解壓縮完後檔案階層

如果是下載libwebp-0.4.1-rc1-windows-x86-no-wic.zip，可以看見以下檔案結構:

    /libwebp-0.4.1-rc1-windows-x86-no-wic
        /bin
        /include
        /lib
        /libwebp-0.4.1-rc1-windows-x86-no-wic
        /Readme.txt
        /Readme-mux.txt
        /test.webp
        /test_ref.ppm
        
請將環境變數設定為 /libwebp-0.4.1-rc1-windows-x86-no-wic/bin 底下

## Step 3. - 執行指令產生webp檔案
### 基本指令

    cwebp [-q Quality] input_file_name [-o Output_file_name]

    Quality 為float，從0~100 代表轉換成webp的品質損失百分比，建議值為70~80
    Output_file_name 為輸出檔案名稱

如果想知道其他功能可以參考Readme.txt

### 遞迴將資料夾底下圖檔生成一份webp

#### step 1 先進到JYDFrontend/src/assets/imgs 資料夾內
#### step 2 在此資料夾內下以下指令
     for /r %i in (*) do cwebp -q 70 %i -o %i.webp
#### step 3 JYDFrontend/src/assets/imgs/ 底下所有圖檔都會生成一份webp檔案
     
----

# OS-Linux
## Step 1. 下載webp套件
    sudo apt-get install webp
## Step 2. - 執行指令產生webp檔案

#### step 1 先進到JYDFrontend/src/assets/imgs 資料夾內
#### step 2 在此資料夾內下以下指令
    sudo find ./ -type f -name '*.png' -exec cwebp -q 70 {} -o {}.webp \;
下完指令後 JYDFrontend/src/assets/imgs/ 底下所有圖檔都會生成一份webp檔案

---
原文連結: https://hackmd.io/7WkIi4xSRN6Ra2EaGQOTzA?both