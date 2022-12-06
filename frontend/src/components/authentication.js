// import Cookies from "universal-cookie";


//   const logout = () => {
//     this.setToken('');
//     this.setState({     
//       'loggedAs': '', 
//       'currentGameId': '',
//       'currentGameName': '',     
//     })
//   }

//    const setToken = (token, username) => {      
//     const cookies = new Cookies();
//     // cookies.set('accessToken', token['access']);
//     // cookies.set('refreshToken', token['refresh']);

//     cookies.set('loggedAs', username);
//     cookies.set('token', token);    
//     this.setState({
//       // 'accessToken': token['access'],
//       // 'refreshToken': token['refresh'],
//       'loggedAs': username,
//       'token': token
//     }, () => this.loadData());
//   }


//   export { setToken, logout};