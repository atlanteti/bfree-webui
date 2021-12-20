export const request = async ({ method,
   headers,
   endpoint,
   data,
   params,
   contentType }) => {
   if (
      method == "get" &&
      endpoint == 'usuarios/listar-todos'
   ) {
      return Promise.resolve({
         "data": [
            {
               "usr_cod": 160,
               "usr_cli_cod": 22220,
               "usr_externalid": "",
               "usr_name": "LEONARDO NUNES",
               "usr_email": "leo@leo2nardonunes.com",
               "usr_phone": "11966145252",
               "usr_sus_cod": 1,
               "usr_dtcreation": "2021-11-24T09:28:56",
               "usr_dtupdate": "2021-12-13T16:09:52",
               "statusUser": {
                  "sus_cod": 1,
                  "sus_name": "ATIVO",
                  "sus_dtcreation": "2021-07-08T15:49:54",
                  "sus_dtupdate": null
               },
               "usersCompanies": null,
               "userJourneys": null,
               "userBadges": null,
               "userTypeDemands": null,
               "teamMembers": null,
               "teamMentors": null
            }
         ],
         "meta": {
            "responseType": "SUCCESS",
            "status": 100,
            "message": "Operação realizada com sucesso!",
            "pagination": null,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCBTZXNzaW9uIjoiY2MyMjJjOWItNjZmMC00Njc1LWEyNGMtYmFkMzc0YjcyNTA3IiwiSUQgQWNjb3VudCI6ImRlYmM0YzcyLTAxMDAtNDU2OS04ZmE0LTgwYzAyMGIxZTE1OSIsIklEIEJmcmVlIjoiMTIwIiwiSUQgRWR1enoiOiI0OTQxNTc5MSIsIm5iZiI6MTYzOTY4NzEyMCwiZXhwIjoxNjM5Njk0MzIwLCJpYXQiOjE2Mzk2ODcxMjB9.LT4ruDCTc6XO89CvisBaC9a-GA76gkTw_I6xiZPxrcc",
            "hasJourney": false
         }
      })
   } else if (
      method == "get" &&
      endpoint == 'status-demands/listar-todos'
   ) {
      return Promise.resolve(
         {
            "data": [
               {
                  "sdm_cod": 1,
                  "sdm_name": "EM ABERTO",
                  "sdm_dtcreation": "2021-07-08T18:48:53",
                  "sdm_dtupdate": "2021-09-14T12:10:49"
               },
               {
                  "sdm_cod": 2,
                  "sdm_name": "AGENDADO",
                  "sdm_dtcreation": "2021-09-14T12:10:49",
                  "sdm_dtupdate": "2021-09-18T15:18:58"
               },
               {
                  "sdm_cod": 3,
                  "sdm_name": "COMPARECIDO",
                  "sdm_dtcreation": "2021-09-14T12:10:49",
                  "sdm_dtupdate": "2021-09-18T15:18:58"
               },
               {
                  "sdm_cod": 4,
                  "sdm_name": "VENDA",
                  "sdm_dtcreation": "2021-09-14T12:10:50",
                  "sdm_dtupdate": "2021-09-18T15:18:58"
               },
               {
                  "sdm_cod": 5,
                  "sdm_name": "DESCARTE",
                  "sdm_dtcreation": "2021-09-14T12:10:50",
                  "sdm_dtupdate": "2021-09-18T15:18:58"
               }
            ],
            "meta": {
               "responseType": "SUCCESS",
               "status": 100,
               "message": "Operação realizada com sucesso!",
               "pagination": null,
               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCBTZXNzaW9uIjoiY2MyMjJjOWItNjZmMC00Njc1LWEyNGMtYmFkMzc0YjcyNTA3IiwiSUQgQWNjb3VudCI6ImRlYmM0YzcyLTAxMDAtNDU2OS04ZmE0LTgwYzAyMGIxZTE1OSIsIklEIEJmcmVlIjoiMTIwIiwiSUQgRWR1enoiOiI0OTQxNTc5MSIsIm5iZiI6MTYzOTY4NzEyMCwiZXhwIjoxNjM5Njk0MzIwLCJpYXQiOjE2Mzk2ODcxMjB9.LT4ruDCTc6XO89CvisBaC9a-GA76gkTw_I6xiZPxrcc",
               "hasJourney": false
            }
         })
   } else if (
      method == "get" &&
      endpoint == 'types-demand/listar-todos'
   ) {
      return Promise.resolve(
         {
            "data": [
               {
                  "tdm_cod": 37,
                  "tdm_name": "TIPO DE DEMANDA 12",
                  "tdm_cpn_cod": 24,
                  "tdm_dtcreation": "2021-11-04T21:28:14",
                  "tdm_dtupdate": null,
                  "company": {
                     "cpn_cod": 24,
                     "cpn_cli_cod": 0,
                     "cpn_name": "TESTE 3 - TESTE 3 - TESTE 3 - TESTE 3 - TESTE",
                     "cpn_dtcreation": "2021-11-04T21:14:54",
                     "cpn_dtupdate": "2021-11-10T17:00:07",
                     "usersCompanies": null
                  },
                  "userTypeDemands": null
               }
            ],
            "meta": {
               "responseType": "SUCCESS",
               "status": 100,
               "message": "Operação realizada com sucesso!",
               "pagination": null,
               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCBTZXNzaW9uIjoiY2MyMjJjOWItNjZmMC00Njc1LWEyNGMtYmFkMzc0YjcyNTA3IiwiSUQgQWNjb3VudCI6ImRlYmM0YzcyLTAxMDAtNDU2OS04ZmE0LTgwYzAyMGIxZTE1OSIsIklEIEJmcmVlIjoiMTIwIiwiSUQgRWR1enoiOiI0OTQxNTc5MSIsIm5iZiI6MTYzOTY4NzEyMCwiZXhwIjoxNjM5Njk0MzIwLCJpYXQiOjE2Mzk2ODcxMjB9.LT4ruDCTc6XO89CvisBaC9a-GA76gkTw_I6xiZPxrcc",
               "hasJourney": false
            }
         }
      )
   } else if (
      method == "post"
   ) {
      return Promise.resolve(
         {
            "data": null,
            "meta": {
               "responseType": "SUCCESS",
               "status": 100,
               "message": "Operação realizada com sucesso!",
               "pagination": null,
               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCBTZXNzaW9uIjoiY2MyMjJjOWItNjZmMC00Njc1LWEyNGMtYmFkMzc0YjcyNTA3IiwiSUQgQWNjb3VudCI6ImRlYmM0YzcyLTAxMDAtNDU2OS04ZmE0LTgwYzAyMGIxZTE1OSIsIklEIEJmcmVlIjoiMTIwIiwiSUQgRWR1enoiOiI0OTQxNTc5MSIsIm5iZiI6MTYzOTc0NDUwNSwiZXhwIjoxNjM5NzUxNzA1LCJpYXQiOjE2Mzk3NDQ1MDV9.8uPxtC2Cd-XIBSZpEDIimIvvOhn2KG_GmaCrgEduPzs",
               "hasJourney": false
            }
         }
      )
   }
}