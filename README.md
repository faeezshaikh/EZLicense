### Best Practices for Security Rules in FB

> Do not use open security rules in Firebase. TurboARB uses Anonymous login to authenticate the client to FB. This way the data is not open to the world for read and write (locking the backdoor)


ionic build browser --minify

`npm run build`

`aws s3 cp --recursive ./www s3://turboarb/www`



![Architecture of TurboARB](https://firebasestorage.googleapis.com/v0/b/ameren-arb.appspot.com/o/turboarb%2F1535512153?alt=media&token=c3c6b7ab-458a-4f07-bfc1-af0ced29b49f)

https://angularfirebase.com/lessons/angular-firebase-authentication-tutorial-anonymous-auth/#Step-1-Enable-Anonymous-Auth-in-Firebase



0. needing to refresh for menu and  acct detail after login.
1. ShowLogin : fAlse giving blank page.
5. Spinner
3. Logout button single click



4. Error msgs on login.
2. Enable / Disable login configurable.
1. AuthService URL Configurable.

1. Send email when new assessment created 
2. show status on Results page and disable buttons if already approved?? idk
3. Diag for each project

4. Testing
5. Diag. update

6. updated by
7. update comments
8. email


9. In mobile version, boxes on 'Review' page are unequal sizes
10. PwA icon and home screen -- too small


11. Update questions content
12. Update help content ** main!


13. Contact us page
14. Resources

15. Smile to unlock

------
0. HIT 'EDIT' TO UPDATE
0.  Details page not showing explanation

4. Calculate score.
5. Calculate image for score.
2. Remove dial from 'Details page'.
4. negqtove score => 0
5. 'Save for later' on zero score zero attempts not working.
5. Restrict dns to corp.
4. Block IE
7. in mobile, admin icons are not showing.
1. Help out of sink with questions.
0. Workflow
2. Diagrams upload
1. Save for Later - In progress.
0. View details are not showing answered question for newly added project.
1. Cleanup
0a. filtering broken
1. top navbar on phone - tested
2. ionicons on PWA not appearing  - tested
3. Pull to refresh
1. Deployment
    1. Css & js for odometer
    2. Spinner calculating score
    3. pic for netskope
    4. other pics download
8. Open help links in new tab
7. Disable create button in form
5. Bug wth sidemenu
6. Bug with odometer css changing on clicks in sidemenu
3. Dynamically update help depending on question
7. Ameren logo
1. Add lastupdated to proj details
2. Update pDetails with assessor , description and last updated.



{
    "Version": "2008-10-17",
    "Id": "S3PolicyId1",
    "Statement": [
        {
            "Sid": "IPDeny",
            "Effect": "Deny",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::turboarb/*",
            "Condition": {
                "NotIpAddress": {
                    "aws:SourceIp": [
                        "199.38.133.55/32",
                        "199.38.133.61/32",
                        "192.189.96.55/32"
                    ]
                }
            }
        }
    ]
}




/////


{
    "Version": "2008-10-17",
    "Id": "S3PolicyId1",
    "Statement": [
        {
            "Sid": "IPDeny",
            "Effect": "Deny",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::turboarb/*",
            "Condition": {
                "NotIpAddress": {
                    "aws:SourceIp": ""
                }
            }
        },
        {
            "Sid": "GiveSESPermissionToWriteEmail",
            "Effect": "Allow",
            "Principal": {
                "Service": "ses.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::turboarb/*",
            "Condition": {
                "StringEquals": {
                    "aws:Referer": "180466373676"
                }
            }
        },
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::turboarb/*"
        }
    ]
}


//////

For cdn:
Origin Domain Name: turboarb.s3.amazonaws.com
Origin Path: /www

Default Root Object: index.html

In Route 53
-   Create A record (Alias) pointing to : d3ds6fv6dwkxm9.cloudfront.net.
///

After deployment
    - invalidate CDN by running * for origin root. wait for a few minutes 


 //////


<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:arc="http://www.ameren.com/Architecture">
   <soapenv:Header/>
   <soapenv:Body>
      <arc:authenticate>
         <!--Optional:-->
         <arc:accountId></arc:accountId>
         <!--Optional:-->
         <arc:password></arc:password>
      </arc:authenticate>
   </soapenv:Body>
</soapenv:Envelope>



<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
   <soap:Body>
      <authenticateResponse xmlns="http://www.ameren.com/Architecture"/>
   </soap:Body>
</soap:Envelope>



 <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
   <soap:Body>
      <authenticateResponse xmlns="http://www.ameren.com/Architecture">
         <response>Logon failure: unknown user name or bad password.</response>
      </authenticateResponse>
   </soap:Body>
</soap:Envelope>


<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
   <soap:Body>
      <authenticateResponse xmlns="http://www.ameren.com/Architecture">
         <response>An operations error occurred.</response>
      </authenticateResponse>
   </soap:Body>
</soap:Envelope>




-------


sudo rm -rf .nvm
sudo rm -rf .npm

Install node and npm by steps here:


nvm instal 4.9.1  // this will install node 4.9.1
npm install npm@5.6.0  // this will install npm 5.6.0


git clone turboarb
cd turboarb
npm install

npm install -g @ionic/app-scripts@latest --save-dev


npm run build --dev


Error:
Jenlins stopped.
Soln: 
sudo service jenkins start
Refer Link:
https://d1.awsstatic.com/Projects/P5505030/aws-project_Jenkins-build-server.pdf

http://54.89.142.116:8080/login?from=%2F


Error; integrity checksum failu
npm cache --force clean

Error: 
 Unexpected token {
    at exports.runInThisContext (vm.js:53:16)

Soln:
update to latest version of node.
nvm install 8.12.0
