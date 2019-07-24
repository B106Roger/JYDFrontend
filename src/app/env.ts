const Api = {
   /*
    140.118.127.154
    UICD348EE55BC1A63AA805F63DE86EB5F7757D2EAD891FDFB25E5A523B26DE9E25D3D9D3952F505B6E4F157652ED50A0342F79CCFD79E70506
    13FCD060F0651739050F60CACBE5C33DD1BA68974831BAC0
   */

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

const fakeUser = [
  {account: '123' , password: '123' , UID: 'Test0001'},
  {account: 'testuser' , password: 'testpassword' , UID: 'Test0002'}
];

const testMode = true;

export { Api , fakeUser };
