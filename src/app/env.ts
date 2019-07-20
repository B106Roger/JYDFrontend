const Api = {
   /* 140.118.127.154 */

   /**
    * @method Post
    * @headers {'Content-Type':'application/json'}
    * @var  UserID   :string
    * @var  Password :string
    * @return UserID , UID
    */
  loginApi      : 'http://140.118.127.154:6907/api/app/LoginAPI.ashx',

   /**
    * @method Get
    * @headers {'Content-Type':'application/json'}
    * @var void
    * @return GameList[]
    */
  gameListApi   : 'http://140.118.127.154:6907/api/app/GameListAPI.aspx',

   /**
    * @method Get
    * @headers {'Content-Type':'application/json'}
    * @var UID       :string
    * @var StartDate :Y-m-d
    * @var EndDate   :Y-m-d
    * @return RecordList[]
    */
  betRecordApi  : 'http://140.118.127.154:6907/api/app/BetRecordAPI.ashx',

   /**
    * @method Get
    * @headers {'Content-Type':'application/json'}
    * @var UID       :string
    * @var StartDate :Y-m-d
    * @var EndDate   :Y-m-d
    * @return RecordList[]
    */
  gameRecordApi : 'http://140.118.127.154:6907/api/app/GameRecordAPI.ashx',

   /**
    * @method Get
    * @headers {'Authorization':'A602F295A6D547309A73AEC701ABC196'}
    * @headers {'Currency':'CNY'}
    * @headers {'UserID':'{{userid}}'}
    * @var void
    * @return data[]
    */
  amountApi     : 'http://140.118.127.154:6907/api/AmountAPI.aspx',

   /**
    * @method Get
    * @var begin : Y-m-d
    * @var end   : Y-m-d
    * @return RecordList[]
    */
  testIORecords   : 'http://localhost:8000/api/history/IORecords',

   /**
    * @method Get
    * @var begin : Y-m-d
    * @var end   : Y-m-d
    * @return RecordList[]
    */
  testGameRecords : 'http://localhost:8000/api/history/gameRecords',

   /**
    * @method Post
    * @var Username :string
    * @var Password :string
    * @return userInfo
    */
  testLogin       : 'http://localhost:8000/api/user/login'
};

export { Api };