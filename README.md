Hi Welcome to the Medi-Book App!

The intent for the Medi-Book App is to allow requests for appointments at Blakeney Surgery, and allow for future expansion to allow a user to select which doctors surgery they wish for their appointment to be at. 

I have created my app through the use of expo go and using "npx expo start" within my terminal to prodce a QR code for access to this app. An alternative method I have used is X-Code, however, I have found that this simulator is a lot slower. 

There are two screens (Home and Request Screen), and each have the same headers and footers, with modals in the top right corner. When the Logo is pressed the user will return to the Home Screen. 

I have used a local host for my api to work to produce an image carousel on the home page. Within the Components folder, I have attempted to use C Sharp, evident under the Image API folder, but could not get it to work, resulting in using the local host. 

For the form on the request screen, there is validation for input boxes and an erorr is displayed when these are not met correctly. If a request is submitted correclty the inputs have been validated before attempting to write the request to an email. This service does not work yet but is implemented correctly due to needing to pay for a fee to use it. Therefore, I have ensured that the submit button also writes the request to a text file. 

Within the home screen I have had to use an image of google maps. I had the setup for a static map through the use of google platforms, seen on the Map.js file, but had to pay to create a working api of fetching google maps into my app. 

Furthermore, I have downloaded Jest for testing, and created a test for the Home and Request Screens to ensure it has been rendered correctly. I have attempted to get these to work but due to importing functions which are not compatible this stops the testing from working. 

