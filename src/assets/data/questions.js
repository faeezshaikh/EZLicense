{
    "quiz": {
        "name": "ARB Self Assessment",
            "logo" : "https://vignette.wikia.nocookie.net/mysims/images/2/22/EA_logo.png/revision/latest?cb=20090801182220",
                "score": 50,
                    "sponsor":""
    },
    "questions": [{
        "Id": 1,
        "Name": "What is the classification of data involved in your project?",
        "Description": "At Ameren, all data is classified in 4 broad categories depending on its sensitivity. To learn more click here:",
        "tag": "Data Classification",

        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Highly Confidential" },
            { "Id": 1056, "QuestionId": 1010, "Name": "Confidential" },
            { "Id": 1056, "QuestionId": 1010, "Name": "Proprietary" },
            { "Id": 1056, "QuestionId": 1010, "Name": "Public" }]
    },
    {
        "Id": 2,
        "Name": "Where do you plan on hosting the data?",
        "Description": "Typically you will need some kind of storage (think database) to store your data. This storage can be hosted inside the Ameren Data Center (on-prem network), or externally.",
        "tag": "Hosting",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Ameren Data Center" },
            { "Id": 1057, "QuestionId": 1010, "Name": "Ameren VPC in AWS" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Public Cloud" },
            { "Id": 1058, "QuestionId": 1010, "Name": "External Data Provider" }]

    },
    {
        "Id": 3,
        "Name": "Does the solution involve integration with or management of Ameren control systems?",
        "Description": "",
        "tag": "Information Rights Mgmt",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]
    },
    {
        "Id": 4,
        "Name": "Who will access the Ameren data?",
        "Description": "",
        "tag": "Data Access",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Ameren Personnel (Employees / Consultant)" },
            { "Id": 1057, "QuestionId": 1010, "Name": "Non Ameren Personnel (eg. Service Provider)" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Customer" },
            { "Id": 1058, "QuestionId": 1010, "Name": "All of the above" }]
    },
    {
        "Id": 5,
        "Name": "In your project or solution how will Ameren data be accessed?",
        "Description": "Data can be accessed via devices that are managed by Ameren admin (eg. Airwatch managed mobile devices) or it can be accessed via devices that are not under Ameren admin's control (eg. contractor using their cell phone to access files in Office 365).",
        "tag": "Data access",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Through managed devices only" },
            { "Id": 1057, "QuestionId": 1010, "Name": "Through nonmanaged devices only" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Both" }]
    },
    {
        "Id": 6,
        "Name": "Is Ameren data encrypted at rest?",
        "Description": "Encryption of data is important. If bad actors get hold of Ameren data storage (database disks), they will be unable to make sense of it if its encrypted using a strong encryption algorithm like SHA 256. Click here to learn more:",
        "tag": "Encryption at rest",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]

    },
    {
        "Id": 7,
        "Name": "Is Ameren data encrypted in transit?",
        "Description": "It is important that when you are transferring data across the internet or across networks, you encrypt data. This will prevent from 'Man in the middle attacks' - a term used to describe programs or bad actors trying to hack into the system by listening to the traffic on the wire. Ckick here to learn more:",
        "tag": "Encryption in transit",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]
    },
    {
        "Id": 8,
        "Name": "Does software adhere to Ameren's preferred technology list?",
        "Description": "See the help section for the Preferred Tech List",
        "tag": "Preferred Technology",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]
    },
    {
        "Id": 9,
        "Description": "Netskope is a tool that Cyber Security at Ameren uses to evaluate external solutions. The Netskope tool has conducted tests for several commercial products in the market and assigned scores to them. Below is an example of what a score looks like. To learn more, click here:",
        "Name": "Is the Netskope rating of the product/solution you plan on using above 50?",
        "Pic": "assets/imgs/netskope.png",
        "tag": "Netskope",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Applicable, but I am not aware of the score" }]
    },
    {
        "Id": 10,
        "Name": "Assuming your solution requires access to Ameren's network including Ameren's control systems what is the integration pattern you will use?",
        "Description": "Many apps will require to integrate with existing Ameren systems in order to provide meaningful services. Sometimes an app or a solution maybe completely standalone with no integration requirements. When integration is required however, it is important to understand if the new app/solution will be accessing any systems that reside inside Ameren data center (examples include ADMS, CSS etc.) ",
        "tag": "Integartion Pattern",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "External to Internal" },
            { "Id": 1057, "QuestionId": 1010, "Name": "Internal to External" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Internal to Internal" },
            { "Id": 1058, "QuestionId": 1010, "Name": "External to External" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Other" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable (app is standalone)" }]
    },
    {
        "Id": 11,
        "Name": "Does the application support role-based authorization?",
        "Description": "It is generally a good practice to allow role based access to your systems. See help for more details:",
        "tag": "RBAC",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]
    },
    {
        "Id": 12,
        "Name": "Assuming your solution uses a secondary user identity store, can this identity store be disabled?",
        "Description": "At Ameren we use Microsoft Active Directory to manage employee and contractor usernames and passwords. Sometimes a solution requires you to implement its own identiy system to manage its users. Click here to learn more:",
        "tag": "Active Directory (SSO)",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable (solution implements SSO With AD)" }]
    },
    {
        "Id": 13,
        "Name": "Does the product's administration role support multi-factor authentication?",
        "Description": "Multi-factor authentication (MFA) is a method of confirming a user's claimed identity in which a computer user is granted access only after successfully presenting 2 or more pieces of evidence (or factors) to an authentication mechanism.Click here to learn more:",
        "tag": "Multi factor authentication",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]
    },
    {
        "Id": 14,
        "Name": "Roughly how many users will be using your solution/product/application?",
        "Description": "This will help determine the risk, should the product not support SSO",
        "tag": "User base",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Less than 25" },
            { "Id": 1057, "QuestionId": 1010, "Name": "Greater than 25" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]
    },
    {
        "Id": 15,
        "Name": "If this solution deals with PCI, HIPPA, NERC, FERC, NRC or SOX data does it adhere to their standards.",
        "Description": "Being in a regulated utility company, Ameren has to comply with various industry standards. Click here to learn more: ",
        "tag": "NERC, FERC Compliance",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]
    },
    {
        "Id": 16,
        "Description": "Some projects will hire a vendor who will help with implmenting a solution. Occassionaly the vendor will own or host Ameren data",
        "Name": "If the vendor owns data, is there a way for Ameren to download the data from the vendor?",
        "tag": "Data owner",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]

    },
    {
        "Id": 17,
        "Description": "It is a very good practice to backup data to prevent from accidental loss , theft and also for disaster recovery purposes.",
        "Name": "Is any customer data backed up to a different location other than Ameren Data Center or Ameren AWS VPC?",
        "tag": "Data Backup",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]

    },
    {
        "Id": 18,
        "Description": "From a regulatory standpoint it is very important that Ameren stores all data inside the US. Click here to learn more:",
        "Name": "Is the data and its backup always stored inside the US?",
        "tag": "USA storage",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]

    },
    {
        "Id": 19,
        "Name": "Has the vendor's data ever been breached?",
        "Description": "Occasionaly breaches happen. Remember the 2015 Anthem data breach or the many Yahoo security breaches? As such it is important that Ameren is aware of any historical breaches that may have occured at a vendor it plans on (or currently is) engaging",
        "tag": "Vendor security breach",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }],
        "Explanation": "Create NAT instance in public subnet which is web server subnet (suDnet-258Dc44d) and add route (rtD-238Dc44D) from private subnet (database subnet-9189c6f9) to the public NAT one to retrieve the updates."

    },
    {
        "Id": 20,
        "Name": "Does your solution or app require access to Ameren's network?",
        "Description": "Many apps will require to integrate with existing Ameren systems in order to provide meaningful services. Sometimes app app or a solution maybe completely standalone with no integration requirements. When integration is required however, it is important to understand if the new app/solution will be accessing any systems that reside inside Ameren data center (examples include ADMS, CSS etc.) ",
        "tag": "Network connectivity",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]
    },
    {
        "Id": 21,
        "Name": "Select the Cyber Insurance amount:",
        "Description": "",
        "tag": "Cyber Insurance",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "None" },
            { "Id": 1057, "QuestionId": 1010, "Name": "Less than 1 million" },
            { "Id": 1058, "QuestionId": 1010, "Name": "1-4 million" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Greater than 5 million" }]
    },
    {
        "Id": 22,
        "Name": "Does the solution have a defined data retention and destruction policy?",
        "Description": "",
        "tag": "Data Retention",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]
    },
    {
        "Id": 23,
        "Name": "Does the solution implement Information Rights Management Technology on the data accessed by the end user?",
        "Description": "",
        "tag": "Information Rights Mgmt",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]
    },
    {
        "Id": 24,
        "Name": "Does the solution support SSO or AD integration?",
        "Description": "",
        "tag": "Information Rights Mgmt",
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Yes" },
            { "Id": 1057, "QuestionId": 1010, "Name": "No" },
            { "Id": 1058, "QuestionId": 1010, "Name": "Not applicable" }]
    }
    ]
}




