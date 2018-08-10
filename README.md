 npm run build
aws s3 cp --recursive ./www s3://turboarb/www



7. Update questions content
8. Update help content ** main!
4. Calculate score.
5. Calculate image for score.

6. Contact us page
7. Resources







------
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
                        "192.189.96.55/32"
                    ]
                }
            }
        }
    ]
}