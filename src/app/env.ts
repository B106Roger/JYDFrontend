const Api = {
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
  gameListApi   : 'https://dev-slot-mario.gd888.cc/gamelab/gamelist',

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
    * @headers { 'Authorization' : Access_token }
    * @var StartDate :Y-m-d
    * @var EndDate   :Y-m-d
    * @return RecordList[]
    */
  gameRecordApi : 'https://admin.jyd188.net/api/game/record',

   /**
    * @method Get
    * @headers { 'Authorization':'A602F295A6D547309A73AEC701ABC196' }
    * @headers { 'Currency':'CNY' }
    * @headers { 'UserID':'{{userid}}' }
    * @var void
    * @return data[]
    */
  amountApi     : 'https://admin.jyd188.net/api/account',

   /**
    * @method PUT
    * @headers {'Authorization' : Access_token }
    * @var oldPassword: string
    * @var newPassword: string
    */
  ChangePasswordApi: 'https://admin.jyd188.net/api/account/password',

   /**
    * @method Get
    * @var begin : Y-m-d
    * @var end   : Y-m-d
    * @return RecordList []
    */
  testIORecords   : 'http://localhost:8000/api/history/IORecords',

   /**
    * @method Get
    * @var begin : Y-m-d
    * @var end   : Y-m-d
    * @return RecordList []
    */
  testGameRecords : 'http://localhost:8000/api/history/gameRecords',

   /**
    * @method Post
    * @var Username :string
    * @var Password :string
    * @return userInfo
    */
   testLogin      : 'http://localhost:8000/api/user/login'

};

const fakeUser = [
  {account: '123' , password: '123' , UID: 'Test0001'},
  {account: 'testuser' , password: 'testpassword' , UID: 'Test0002'}
];

const precision = 2;

export { Api , fakeUser , precision };
