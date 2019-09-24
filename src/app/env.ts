const Api = {
   /*
    UICD348EE55BC1A63AA805F63DE86EB5F7757D2EAD891FDFB25E5A523B26DE9E25D3D9D3952F505B6E4F157652ED50A0342F79CCFD79E70506
    13FCD060F0651739050F60CACBE5C33DD1BA68974831BAC0

    https://jyddev.azurewebsites.net/
    https://jyddev.azurewebsites.net/
   */
   /**
    * @method Post
    * @headers {'Content-Type':'application/json'}
    * @var  UserID   :string
    * @var  Password :string
    * @return access_token , expires_in , token_type , scope
    */
  loginApi      : 'https://admin.jyd188.net/auth/connect/token',

   /**
    * @method Get
    * @headers {'Content-Type':'application/json'}
    * @var void
    * @return GameList[]
    */
  gameListApi   : 'https://dev-slot-mario.gd888.cc/gamelab/slot-mario/v3/config/priorities',

   /**
    * @method Get
    * @headers {'Authorization' : Access_token}
    * @var StartDate :Y-m-d
    * @var EndDate   :Y-m-d
    * @return RecordList[]
    */
  betRecordApi  : 'https://admin.jyd188.net/api/account/betrecord',
   /**
    * @method Get
    * @headers {'Authorization' : Access_token}
    * @var StartDate :Y-m-d
    * @var EndDate   :Y-m-d
    * @return RecordList[]
    */
  gameRecordApi : 'https://admin.jyd188.net/api/game/record',

   /**
    * @method Get
    * @headers {'Authorization':'A602F295A6D547309A73AEC701ABC196'}
    * @headers {'Currency':'CNY'}
    * @headers {'UserID':'{{userid}}'}
    * @var void
    * @return data[]
    */
  amountApi     : 'https://admin.jyd188.net/api/account',

   /**
    * @method PUT
    * @headers {'Authorization' : Access_token}
    * @var oldPassword: string
    * @var newPassword: string
    */
  ChangePasswordApi: 'https://admin.jyd188.net/api/account/password',

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
