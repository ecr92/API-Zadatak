import { test, expect } from '@playwright/test';
const petId = 1000;
const userId= 1992;
const orderId = 1;
const userName= "ecr";
const petStatus = 'sold';

test.describe('Pet', () => {

  //NISI NI KRENUO 
  test('uploadImage', async ({ request,baseURL }) => {
      const response = await request.post(baseURL+'pet/'+petId+'/uploadImage', {
          data:
          {
          "additionalMetadata" :"est",
          "file": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKd58klvw4H8lAfefJkQc0PsU7_0o0VGjxjQSl8cXoeyIa0R542phKWT5SEJP1orXrYCE&usqp=CAU"
          },
      })
      expect(response.status()).toBe(200);
      console.log(await response.json());
      })

  ///RADI Add a new pet to the store
  test('Add a new pet to the store', async ({ request,baseURL }) => { 
          const response = await request.post(baseURL+'pet', {
              data:
              {
                  "id": petId,
                  "category": {
                    "id": petId,
                    "name": "ecr"
                  },
                  "name": "doggie",
                  "photoUrls": [
                    "string"
                  ],
                  "tags": [
                    {
                      "id": 0,
                      "name": "string"
                    }
                  ],
                  "status": "available"
              },
          })
          expect(response.status()).toBe(200);
          console.log(await response.json());
          
          expect(await response.json()).toStrictEqual(
            {  
              "id": petId,
              "category": {
                "id": petId,
                "name": "ecr"
              },
              "name": "doggie",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "available"
            }
          ); 
      })

  ///RADI find pet by status ali treba dodat nekakav status check
  test('find pet by status', async ({ request,baseURL }) => {
    const myStatus = {status: 'available'};
          const response = await request.get("https://petstore.swagger.io/v2/pet/findByStatus?status="+petStatus, { })
          console.log(await response.json());
          expect(response.status()).toBe(200);
      });

  //Radi ali prije toga se treba pokrenut add new pet
  test('find pet by ID', async ({ request,baseURL }) => {
          const response = await request.get(baseURL+'pet/'+ petId, { })
          console.log(await response.json());
          expect(response.status()).toBe(200);
          expect(await response.json()).toEqual(
            {
              "id": petId,
              "category": {
                "id": petId,
                "name": "ecr"
              },
              "name": "doggie",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "available"
            }
          );
      })

  //415 ERROR!
  test.only('Updates a pet in the store with form data', async ({ request,baseURL }) => {
    console.log(baseURL+'pet/'+ petId)
    const response = await request.post(baseURL+'pet/'+petId, {
      data: {
          name: "ecr",
          status: "available"
      },
  })
          expect(response.status()).toBe(200);
          expect(await response.json()).toEqual(
            {  
              "id": petId,
              "category": {
                "id": petId,
                "name": "updateddddd"
              },
              "name": "doggie",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "available"
            }
          ); 
      })

  //Radi ali prije toga se treba pokrenut add new pet
  test('Update an existing pet', async ({ request,baseURL }) => {
          const response = await request.put(baseURL+'pet', {
              data:
              {
                "id": petId,
                "category": {
                  "id": petId,
                  "name": "string"
                },
                "name": "T-Rex",
                "photoUrls": [
                  "string"
                ],
                "tags": [
                  {
                    "id": petId,
                    "name": "string"
                  }
                ],
                "status": "available"
              },
          })
          expect(response.status()).toBe(200);
          console.log(await response.json());
          expect(await response.json()).toStrictEqual( {  
              id: petId,
              category: { id: petId, name: 'string' },
              name: 'T-Rex',
              photoUrls: [ 'string' ],
              tags: [ { id: petId, name: 'string' } ],
              status: 'available'
            }
          ); 
      })

  //RADI
  test('Deletes a pet', async ({ request,baseURL }) => {
          const response = await request.delete(baseURL+'pet/'+petId, {
        })
          expect(response.status()).toBe(200);
          console.log(await response.json());
      }) 

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
test.describe('Store', () => {
        //RADI
        test('Place an order for a pet', async ({ request,baseURL }) => {
          const response = await request.post(baseURL+'store/order', {
              data:
              {
                  "id": orderId,
                  "petId": petId,
                  "quantity": 1,
                  "shipDate": "2022-07-18T09:41:52.896+0000",
                  "status": "placed",
                  "complete": true
              },
            })
          expect(response.status()).toBe(200);
          console.log(await response.json());
          expect(await response.json()).toStrictEqual(
            {  
              "id": orderId,
              "petId": petId,
              "quantity": 1,
              "shipDate": "2022-07-18T09:41:52.896+0000",
              "status": "placed",
              "complete": true
            }
          ); 
        })
        //RADI-POKRENI NEW PET I PALCE A ORDER
        test('Find purchase order by ID', async ({ request,baseURL }) => {
          const response = await request.get(baseURL+'store/order/'+orderId, {  
            })
          expect(response.status()).toBe(200);
          console.log(await response.json());
          expect(await response.json()).toEqual(expect.objectContaining({
            "id": orderId,
            "petId": petId,
            "quantity": 1,
            "status": "placed",
            "complete": true
          }));
        })
      //RADI-POKRENI NEW PET I PALCE A ORDER
        test('Delete purchase order by ID', async ({ request,baseURL }) => {
          const response = await request.delete(baseURL+'store/order/'+orderId, {  
            })
          expect(response.status()).toBe(200);
          console.log(await response.json());
        })

        //Nekako provjerit da je doabr budy ali uvjek su drugaciji rezultati
        test('Returns pet inventories by status', async ({ request,baseURL }) => {
          const response = await request.get(baseURL+'store/inventory', {  
            })
          expect(response.status()).toBe(200);
          console.log(await response.json());
        })

})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
test.describe('User', () => {
    //RADI
      test('Creates list of users with given input array', async ({ request,baseURL }) => {
        const response = await request.post(baseURL+'user/createWithArray', {
            data:
            [
              {
                "id": 11634451,
                "username": "ecr7",
                "firstName": "edi",
                "lastName": "crn",
                "email": "ex ut",
                "password": "no",
                "phone": "exercitation consequat amet pariatur Duis",
                "userStatus": -4172575
              },
              {
                "id": -46197610,
                "username": "consectetur et amet eiusmod",
                "firstName": "i",
                "lastName": "laboris ipsum officia reprehenderit aute",
                "email": "ex",
                "password": "consectetur cillum reprehenderit elit",
                "phone": "dolore dolor consequat",
                "userStatus": -24656074
              }
            ]
        })
          expect(response.status()).toBe(200);
          console.log(await response.json());
          expect(await response.json()).toStrictEqual(
            {  
              "code": 200,
              "type": "unknown",
              "message": "ok"
            }
          ); 
    })
    //RADI
      test('Get user by user name', async ({ request,baseURL }) => {
        const response = await request.get(baseURL+'user/'+userName, {
          })
          expect(response.status()).toBe(200);
          console.log(await response.json());
          expect(await response.json()).toStrictEqual(
            {
              id: userId,
              username: userName,
              firstName: 'edi',
              lastName: 'crn',
              email: 'email',
              password: 'string',
              phone: 'string',
              userStatus: 0
            }
          ); 
    })
    //RADI
    test('Updated user', async ({ request,baseURL }) => {
      const response = await request.put(baseURL+'user/'+userName, {
        data:{
          "id": userId,
          "username": "ecr update",
          "firstName": "crnković",
          "lastName": "string",
          "email": "string",
          "password": "string",
          "phone": "string",
          "userStatus": 0
        }
        })
        expect(response.status()).toBe(200);
        console.log(await response.json());
        expect(await response.json()).toEqual(
          {
            code: 200, type: 'unknown', message: "1992"
          }); 
    })
    //RADI-KREIRAJ USERA PRIJE
    test('Deletes a user', async ({ request,baseURL }) => {
      const response = await request.delete(baseURL+'user/'+userName, {
    })
      expect(response.status()).toBe(200);
      console.log(await response.json());
      expect(await response.json()).toStrictEqual(
        {
          code: 200, type: 'unknown', message: userName
        }); 
    }) 
    //RADI
    test('Logs user into the system', async ({ request,baseURL }) => {
            const response = await request.get(baseURL+'user/login?username='+userName+'&password=123456', {
              })
              expect(response.status()).toBe(200);
              console.log(await response.json());

    })
    //RADI
    test('post user', async ({ request,baseURL }) => {
        const response = await request.post('https://petstore.swagger.io/v2/user', {
            data:
            {
                "id": userId,
                "username": userName,
                "firstName": "edi",
                "lastName": "crn",
                "email": "email",
                "password": "string",
                "phone": "string",
                "userStatus": 0
            },
        })
          expect(response.status()).toBe(200);
          console.log(await response.json());
          expect(await response.json()).toStrictEqual(
            {  
              code: 200, type: 'unknown', message: '1992' 
            }
          ); 
    })
    //RADI
    test('Logs out current logged in user session', async ({ request,baseURL }) => {
        const response = await request.get(baseURL+'user/logout', {
          })
          expect(response.status()).toBe(200);
          console.log(await response.json());
          expect(await response.json()).toStrictEqual(
            {
                "code": 200,
                "type": "unknown",
                "message": "ok" 
            }
          ); 
    })
})