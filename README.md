 npm run build
aws s3 cp --recursive ./www s3://turboarb/www


1. Send email when new assessment created 
3. show status on Results page and disable buttons if already approved?? idk
1. Diag for each project




0. Testing
2. Diag. update

3. updated by
4. update comments
5. email



6. In mobile version, boxes on 'Review' page are unequal sizes
1. PwA icon and home screen -- too small


7. Update questions content
8. Update help content ** main!



6. Contact us page
7. Resources

0. Smile to unlock







------
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