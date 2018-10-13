describe("Go to the Homepage ", function () {

    browser.ignoreSynchronization = true; // This allows to protractor to run on regular website, not specific to angular 

    it("Go to the Home page ", function () {
        // browser.get("http://cicd-turboarb.s3-website-us-east-1.amazonaws.com/www/index.html"); // Go to a specific URL
        browser.get("http://localhost:8100"); // Go to a specific URL
        expect(browser.getTitle()).toEqual('ARB Self Assessment');
        console.log("Success - Open home page.") // Log a message
//         var width = 800;
// var height = 600;
// browser.driver.manage().window().setSize(width, height);
//         browser.sleep(1000);
//         browser.driver.manage().window().maximize();
//         browser.sleep(1000);
    });


    it("Logs in", function () {
        var id = element(by.id('id'));
        id.click();
        var input = id.element(by.css('input'));
        input.click();
        input.sendKeys('arb_bot');
        browser.sleep(300);

        var pwd = element(by.id('pwd'));
        pwd.click();
        var input = pwd.element(by.css('input'));
        input.click();
        input.sendKeys('Posidon745');
        browser.sleep(300);


        element(by.id('submitButton')).click();
        console.log("Success - Log in.") 
        browser.sleep(500);

    });

     it("Shows side menu", function () {
             element(by.id('sidemenuButton')).click();
             browser.sleep(1000);
             element(by.className('show-backdrop')).click();
             browser.sleep(1000);
             console.log("Success - Open side menu.") 

     });

     it("Search for a Project", function () {

        var searchBar = element(by.id('searchBar'));
        searchBar.click();
        var input = searchBar.element(by.css('input'));
        input.click();
        input.sendKeys('fshaikh');
        browser.sleep(2000) // Tell Protractor to Wait for 1000 miliseconds or 1sec
        console.log("Success - Search Functionality.") 
        
        // browser.navigate().back(); // Tell the browser to go back 
    });


 

      it("Views Details of a Project", function () {

        var detailsButton = element.all(by.id('viewDetailsButton')).get(2).click();
        browser.sleep(2000);
        var assessor = element(by.id('assessor')).click();

        browser.actions()
                .mouseDown(element(by.id('assessor')),{x: 100, y: 100})
                // .mouseDown()
                .perform();
        browser.sleep(2000);
       
        // browser.executeScript('window.scrollTo(0,500);').then(function () {
        //     console.log('Scrolled down...');
        //     var picture = element(by.id('picture')).click();
        //     browser.sleep(2000);
        //     console.log("Success - Open diagram.") 
        // })


        var scrolldown1 = element(by.id('recommendations'));
        var scrolldown2 = element(by.id('pictureText'));
        var scrolldown3 = element(by.id('assessmentResponse'));
        var scrolldown4 = element(by.id('closeButton'));
        
        browser.controlFlow().execute(function() {
            browser.executeScript('arguments[0].scrollIntoView(true)', scrolldown1.getWebElement());
            browser.sleep(1000);
        });

        browser.controlFlow().execute(function() {
            browser.executeScript('arguments[0].scrollIntoView(true)', scrolldown2.getWebElement());
            browser.sleep(1000);
        });
            
        browser.controlFlow().execute(function() {
            browser.executeScript('arguments[0].scrollIntoView(true)', scrolldown3.getWebElement());
            browser.sleep(1000);
        });

        browser.controlFlow().execute(function() {
            browser.executeScript('arguments[0].scrollIntoView(true)', scrolldown4.getWebElement());
            browser.sleep(1000);
        });


        browser.controlFlow().execute(function() {
            browser.executeScript('arguments[0].scrollIntoView(true)', scrolldown2.getWebElement());
            browser.sleep(1000);
            var picture = element(by.id('picture')).click();
            browser.sleep(1000);
            console.log("Success - Open diagram.") 
        });
            



        var backButton = element(by.className('back-button bar-button bar-button-md back-button-md bar-button-default bar-button-default-md show-back-button')).click();
        
        browser.sleep(2000);
        var closeButton = element(by.id('closeButton')).click();
        browser.sleep(1000);
        var searchBar = element(by.id('searchBar'));
        searchBar.click();
        var input = searchBar.element(by.css('input'));
        for(let i=0;i<7;i++) // clear fshaikh
            input.sendKeys(protractor.Key.BACK_SPACE);
  
        browser.sleep(3000);
        console.log("Success - Open project details.") 
      
    });


    it("Creates a New Project", function () {

        var closeButton = element(by.id('createButton')).click();
        browser.sleep(2000);
        console.log("Success - Create new project.") 
    });

    it("Fills a New Project Form", function () {
        var projectName = element(by.id('projectName')).click();
        projectName.element(by.css('input')).click().sendKeys('ARB Bot Test Project');

        browser.sleep(1000);

        var projecDesc = element(by.id('projecDesc')).click();
        projecDesc.element(by.css('textarea')).click().sendKeys('This project was created by the ARB Bot.');


        browser.sleep(3000);


        // browser.executeScript('window.scrollTo(0,500);').then(function () {
        //     console.log('Scrolled down...');
        //     var createButton = element(by.className('button button-md button-default button-default-md button-block button-block-md button-md-primary')).click();
        //     browser.sleep(2000);
        // })


        var sd4 = element(by.className('button button-md button-default button-default-md button-block button-block-md button-md-primary'));
        
        browser.controlFlow().execute(function() {
            browser.executeScript('arguments[0].scrollIntoView(true)', sd4.getWebElement());
            browser.sleep(1000);
            element(by.className('button button-md button-default button-default-md button-block button-block-md button-md-primary')).click();
            
        });
     
        console.log("Success - Fill new project form.") 
        browser.sleep(1000);

    });

    it("Does an Assessment.", function () {

        browser.sleep(1000);
        element(by.id('helpCircle')).click();
        browser.sleep(1000);
        element(by.id('helpCloseButton')).click();
        browser.sleep(1000);


        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(0).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
       
        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(1).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
       
        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(2).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
      
        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(3).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
       
        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(1).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(0).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        
        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(1).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(0).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(0).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(1).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(0).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(1).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        


        browser.sleep(1000);
        element(by.id('helpCircle')).click();
        browser.sleep(1000);
        element(by.id('helpCloseButton')).click();
        browser.sleep(1000);



        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(2).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(0).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(2).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(1).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(0).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(0).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(2).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(1).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(0).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(2).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(1).click();
        // browser.sleep(1000);
        browser.sleep(500);
        element(by.id('nextButton')).click();
        

        element(by.id('radioGroup')).all(by.tagName('ion-item')).all(by.tagName('ion-radio')).get(0).click();
        // browser.sleep(1000);
        browser.sleep(500);
        // element(by.id('nextButton')).click();
        
        
        element(by.id('scoreButton')).click();
        browser.sleep(2000);

        element(by.className('yesButtonClass')).click();
        browser.sleep(6000);

        element(by.id('fileForAssessmentButton')).click();
        browser.sleep(3000);

        element(by.className('yesFileAssessment')).click();
        browser.sleep(6000);
        console.log("Success - Perform ARB Assessment.") 

    });

    it("Finds the test project.", function () {

        var searchBar = element(by.id('searchBar'));
        searchBar.click();
        var input = searchBar.element(by.css('input'));
        input.click();
        input.sendKeys('arb_bot');
        browser.sleep(3000) // Tell Protractor to Wait for 1000 miliseconds or 1sec
        console.log("Success - Search test project.") 
    });

  
 


    it("Deletes the test project.", function () {
        element(by.id('deleteProjectButton')).click();
        browser.sleep(1000);
        element(by.className('yesDeleteButton')).click();
        browser.sleep(1000);
        console.log("Success - Delete test project.") 

    });
   
    it("Clears Search results", function () {
        var searchBar = element(by.id('searchBar'));
        searchBar.click();
        var input = searchBar.element(by.css('input'));
        for(let i=0;i<10;i++) // clear fshaikh
            input.sendKeys(protractor.Key.BACK_SPACE);
    
        browser.sleep(3000);
        console.log("Success - Search results cleared.") 
    });


    it("Shows side menu", function () {
        element(by.id('sidemenuButton')).click();
        browser.sleep(2000);

        element(by.buttonText('Logout')).click();
        browser.sleep(2000);
        console.log("Success - Logout.") 
    });


    // it("Logs out", function () {
      
    // });


});