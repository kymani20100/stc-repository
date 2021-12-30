import Id from '../../models/id';
export const FETCH_ID = 'FETCH_ID';

export const fetchID = () => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('http://67.222.135.25:8024/api/Data/API_GetParamDetailsList', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "APITocken": '9D85A0FB-73E1-413C-BC2C-C95DDCD9CD89',
            "APPType": 'MOBAND'
        },
        body: JSON.stringify({"ID":"19","Nm":"Select Travel Documnet Type"
    })
    })
  
      const resData = await response.json();
      // console.log(resData);
      // const loadedID = [];
  
      // for (const key in resData.SearchDetail) {
      //   if(key !== '0'){
      //     loadedID.push(
      //       new Id(
      //         resData.SearchDetail[key].ID,
      //         resData.SearchDetail[key].Nm,
      //       )
      //     );
      //   }
      // }
  
      dispatch({ type: FETCH_ID, idType: resData });
    };
  };