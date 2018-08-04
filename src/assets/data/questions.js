{
    "quiz": {
        "name": "ARB Self Assessment",
        "logo" : "https://vignette.wikia.nocookie.net/mysims/images/2/22/EA_logo.png/revision/latest?cb=20090801182220",
        "score": 50,
        "sponsor":"Joe Solari"
    },
    "questions": [{
        "Id": 1,
        "Name": "What is the classification of data involved in your project?",
        "Description":"At Ameren, all data is classified in 4 broad categories depending on its sensitivity. To learn more click here:",
        
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Highly Confidential"},
            { "Id": 1056, "QuestionId": 1010, "Name": "Confidential"},
            { "Id": 1056, "QuestionId": 1010, "Name": "Proprietary" },
            { "Id": 1056, "QuestionId": 1010, "Name": "Public" }]
    },
    {
        "Id": 2,
        "Name": "Where do you plan on hosting the data?", 
        "Description":"Typically you will need some kind of storage (think database) to store your data. This storage can be hosted inside the Ameren Data Center (on-prem network), or externally.",
        
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Ameren Data Center"},
            { "Id": 1057, "QuestionId": 1010, "Name": "Ameren VPC in AWS"},
            { "Id": 1058, "QuestionId": 1010, "Name": "Public Cloud" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Expernal Data Provider"}]
        
    },
    {
        "Id": 3,
        "Description": "Netskope is a tool that Cyber Security at Ameren uses to evaluate external solutions. The Netskope tool has conducted tests for several commercial products in the market and assigned scores to them. To learn more, click here:", 
        "Name":"Is the Netskope rating of the product/solution you plan on using above 50?",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes"},
            { "Id": 1057, "QuestionId": 1010, "Name": "No"},
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Applicable, but I am not aware of the score" }],
        "Explanation": "AWS reserves the FIRST four addresses and LAST one address of the CIDR block. A CIDR block does not always start at 0 or end at 255. Work with the CIDR calculator to see how this works. http://www.subnet-calculator.com/cidr.php",
        "Ref":"http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Subnets.html"    
    },
    {
        "Id": 4,
        "Name": "Does the vendor own the data?", 
        "Description":"If you plan on purchasing a product, or engaging an external partner to help with implementing your solution it is very common that the vendor will need access to Ameren data. Having access to data though is different from owning the data. Click here to learn more.",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes"},
            { "Id": 1057, "QuestionId": 1010, "Name": "No"},
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }],
        "Explanation": "See link for further information",
        "Ref":"https://aws.amazon.com/ec2/vcenter-portal/"   
        
    },
    {
        "Id": 5,
        "Name": "", 
        "Description":"",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Promote code through the Codepipeline service.", "IsAnswer": false },
            { "Id": 1056, "QuestionId": 1010, "Name": "Create a CI/CD Pipeline.", "IsAnswer": false },
            { "Id": 1057, "QuestionId": 1010, "Name": "Run SQL Queries", "IsAnswer": true },
            { "Id": 1058, "QuestionId": 1010, "Name": "Run Shell Scripts", "IsAnswer": true},
            { "Id": 1059, "QuestionId": 1010, "Name": "Copy files", "IsAnswer": true}]
        
    },
    {
        "Id": 6,
        "Name": "", 
        "Description":"",
        "Options": [
              { "Id": 1055, "QuestionId": 1010, "Name": "/16", "IsAnswer": false },
            { "Id": 1056, "QuestionId": 1010, "Name": "/24", "IsAnswer": false },
            { "Id": 1057, "QuestionId": 1010, "Name": "/28", "IsAnswer": true },
            { "Id": 1058, "QuestionId": 1010, "Name": "/29", "IsAnswer": false }],
        "Explanation": "Ans: /28. See link for further information",
        "Ref":"http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Subnets.html"   
        
    },
    {
        "Id": 7,
        "Name": "", 
        "Description":"", 
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "DynamoDBDataExists", "IsAnswer": true },
            { "Id": 1056, "QuestionId": 1010, "Name": "ShellCommandPrecondition", "IsAnswer": true },
            { "Id": 1057, "QuestionId": 1010, "Name": "S3KeyDoesNotExist", "IsAnswer": false },
            { "Id": 1058, "QuestionId": 1010, "Name": "S3PrefixExists", "IsAnswer": true }],
        "Explanation": "AWS Data Pipeline provides built-in support for the following preconditions: DynamoDBDataExists,DynamoDBTableExists,S3KeyExists,S3PrefixExists,ShellCommandPrecondition",
        "Ref":"https://aws.amazon.com/datapipeline/faqs/"   
        
    },
    {
        "Id": 8,
        "Name": "", 
        "Description":"", "Name": "A company is using Volume Gateway to migrate on-prem data to AWS. However when the admin checks the console, he cannot see the volume data in S3. What could be the right explanation for this?", 
        
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Volume Gateway requires AWS Direct Connect for backing up data to AWS. The company has to use AWS Direct Connect for this to work", "IsAnswer": false },
            { "Id": 1056, "QuestionId": 1010, "Name": "Volume Gateway needs to have a target bucket defined in S3. The admin should verify if the bucket was correctly configured. ", "IsAnswer": false},
            { "Id": 1057, "QuestionId": 1010, "Name": "Your volumes are stored in Amazon S3 and accessible through AWS Storage Gateway. You cannot directly access them by using Amazon S3 API actions. ", "IsAnswer": true },
            { "Id": 1058, "QuestionId": 1010, "Name": "The compnay should be using Tape Gateway to migrate the on-prem data to AWS", "IsAnswer": false }],
        "Explanation": "Your volumes are stored in Amazon S3 and accessible through AWS Storage Gateway. You cannot directly access them by using Amazon S3 API actions. You can take point-in-time snapshots of gateway volumes that are made available in the form of Amazon EBS snapshots. Use the file interface to work with your data natively in S3.",
        "Ref":"https://aws.amazon.com/storagegateway/faqs/"  
    },
    {
        "Id": 9,
        "Name": "", 
        "Description":"",  "Pic": "assets/img/ques1.png",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Create a bastion and NAT instance in subnet-258bc44d, and add a route from rtb-238bc44b to the NAT instance.", "IsAnswer": true },
            { "Id": 1056, "QuestionId": 1010, "Name": "Add a route from rtb-238bc44b to igw-2d8bc445 and add a bastion and NAT instance within subnet-248bc44c.", "IsAnswer": false },
            { "Id": 1057, "QuestionId": 1010, "Name": "Create a bastion and NAT instance in subnet-248bc44c, and add a route from rtb-238bc44b to subnet-258bc44d.", "IsAnswer": false },
            { "Id": 1058, "QuestionId": 1010, "Name": "Create a bastion and NAT instance in subnet-258bc44d, add a route from rtb-238bc44b to Igw-2d8bc445, and a new NACL that allows access between subnet-258bc44d and subnet- 248bc44c.", "IsAnswer": false }],
        "Explanation":"Create NAT instance in public subnet which is web server subnet (suDnet-258Dc44d) and add route (rtD-238Dc44D) from private subnet (database subnet-9189c6f9) to the public NAT one to retrieve the updates."

    }
     ,
     {
        "Id": 10,
        "Name": "", 
        "Description":"","Tag":"CloudMigration",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "A VM Import of the current virtual machine.", "IsAnswer": true },
            { "Id": 1056, "QuestionId": 1010, "Name": "An Internet Gateway to allow a VPN connection.", "IsAnswer": false },
            { "Id": 1057, "QuestionId": 1010, "Name": "Entries in Amazon Route 53 that allow the Instance to resolve its dependencies' IP addresses", "IsAnswer": false },
            { "Id": 1058, "QuestionId": 1010, "Name": "An IP address space that does not conflict with the one on-premises", "IsAnswer": true },
            { "Id": 1058, "QuestionId": 1010, "Name": "An Elastic IP address on the VPC instance", "IsAnswer": false },
            { "Id": 1058, "QuestionId": 1010, "Name": "An AWS Direct Connect link between the VPC and the network housing the internal services", "IsAnswer": true }]
    } 
     ]
}