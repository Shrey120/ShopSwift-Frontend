# ShopSwift E-commerce Website

Link to live version - [ShopSwift](https://shopswiftely.vercel.app/).

ShopSwift is a e-commerce web application that allows users to search for products stored in database, add them to shopping cart and then make payment using Stripe. App has login system functionality. The guest user is able to browse, search and add product to cart only. Checkout and payment option is available for registerd users.Only Admin can access the admin pages and its functionalities.

## Tech Stack

**Client:** React, CSS

**Server:** Node, Express, MongoDB

**Other:** Stripe

## User Stories

- As a user I want easily search for product - it is achieved by using search bar available on menubar
- As a user I want to find more details about product - after click on selected product user is redirected to page with all details about chosen product
- As a user I want to add product to cart - user is able to add product to cart and select quantity if required (1 is default value)
- As a user I want to update / delete items from cart - user is able to update and delete items on cart page
- As a user I want to pay for chosen product - after registration/login user is able to access checkout page
- As a business owner I want to expand my business and increase sales
  - it is achieved by building online presence
  - it is achieved by monitoring the various user data and managing it

## Layout

The layout is simple and consistent through all modern browsers. The project has been designed with a mobile first approach and it is fully responsive across devices. To achieve this Bootstrap 4 components library was used along with custom styles.
Project consist following pages:

- Homepage
  - page where are displayed all featured products in form of card with image and short info about specs and price of each product
- Product Details
  - Page include all details about selected product - image, description, main components summary, price and add to cart button with input field allowing select product quantity
- Cart page / empty cart
  - Page allows to review what is in cart - Image thumbnail is displayed along with product name and possibility for user to change quantity or delete item completely.
    Page include total price for all product placed in cart. Below that there are two buttons, one placed on right hand side and second on the left hand side of the screen allowing user to continue shopping(left button) or go to checkout(right button). When we remove all items cart icon is displayed with short info that cart is empty and user can go back shopping by clicking _Continue Shopping_ button
- Search page / no search results
  - Page displays searching results in form similar to homepage. There is a card with image and short info about specs and price of each product.
    When keyword enter into searchbox isn't match any product, search icon is displayed along with text informing user that product is not found.
- Checkout page (available after user login)
  - Page similar to cart page but the difference is that user can't update any product details. This is summary before payment. Page displays product thumbnail, name, quantity, price and total price. Below that user has payment form to fill in with user details and card details. After payment user is redirected to homepage.
- Orders (available after user login)
  - User can see various orders they have done and check the delievery status
- Login
  - Page allows user to login (user get access to checkout page and payment functionality)
- Registration
  - Page allows user to create an account (user get access to login functionality)
- Admin
  - Page can only be accessed by user with Admin Rights
  - Page is user-friendly control center to maintain various aspects of your web application like managing and organising content, tracking website analytics, managing user accounts, and performing various other tasks like adding and deleting of products and user, updation of delievery of items.

### Manual testing

Manual testing was performed by clicking every element on page which can be clicked.

1. Search form

   - Available all the time on menubar
   - Try to submit empty form and verify that an error message about required fields appear - form doesn't have required attribute. After submiting returning page with all available products.
   - Try to submit the form with valid input and verify that a success message appears (after entering keyword user is redirected to results page and the product matches searching criteria are displayed)

2) Login form page

   - Go to Products(homepage) page
   - Click Log in link on navigation bar (user is redirected to login page)
   - Try to submit empty form and verify that an error message about required fields appear(required field message appears)
   - Try to submit the form with valid input and verify that a success message appears (user is redirected to homepage with successful login message)
   - Try to submit the form with invalid input and verify that a error message appears (_Your username or password is incorrect_ message appears)

3. Registration form page

   - Go to Product(homepage) page
   - Click Log in link on navigation bar (user is redirected to registration page)
   - Click _Create account_ button below the login form
   - Try to submit empty form and verify that an error message about required fields appear (required field message appears)
   - Try to submit the form with valid input and verify that a success message appears (user is redirected to homepage with success message)
   - Try to submit the form with invalid input and verify that a error message appears (_Unable to register your account_ message appears)
   - Click _Sign In_ under _Create account_ button (user is redirected to login page with success message)

4. Add to cart form

   - Go to Product details page
   - Try to submit empty form and verify that an error message about required fields appear (required message appears)
   - Try to submit the form with valid input and verify that a success message appears (_Item added to your cart. View cart_ message appears)
   - Try to submit the form with invalid input and verify that a error message appears.(field has html5 type _number_ attribute and initial default value 1 preventing entering invalid input)

5. Cart form

   - Go to the Cart page
   - Try to submit empty form and verify that an error message about required fields appear (required message appears)
   - Try to submit the form with valid input and verify that a success message appears (_Cart updated_ message appears)
   - Try to submit the form with invalid input and verify that a error message appears (field has html5 type _number_ attribute preventing entering invalid input and also has initial value number of the specific item, which was selected on _add to cart_ page)
   - Click _Trash_ icon - item is deleted from cart (message appears)
   - Click _Shoppig_ button (user is redirected to products page (homepage))
   - Click _Checkout_ button (user is redirected to checkout page)

6. Payment user details/ credit card form

   - Go to Checkout page
   - Try to submit empty form and verify that an error message about required fields appear (required message appears)
   - Try to submit the form with valid input and verify that a success message appears (user is redirected to homepage and message appears)
   - Try to submit the form with invalid input and verify that a error message appears (use different card number cause error message appears)

   All fields in user details form have required attribute. Credit card forms has required attr set to false as there is some issue and payment cannot be successfully proceed.

   For Stripe payment test following details need to be used:

   Card number - 4242424242424242

   CVC - any 3 digit number

   Expiry date - any date in the future

7) Scrolling up and down all the pages

   - Project was manually tested in all the major browsers including Google Chrome, Safari and Internet Explorer to confirm compatibility. The tests were conducted in virtual mode using the google developer tools and also physical mobile phones such us: Samsung Galaxy Note 9, Htc One S, Samsung A20. App looks consistent and works well on different browsers and screen sizes.

8) Site navigation

   - Click on _Home_ link (redirect to homepage)
   - Click on logo/brand link (redirect to homepage)
   - Click on _Log in_ link (redirect to login page form)
   - Click on _Register_ link (redirect to registration page form)
   - Click on _Cart_ link (redirect to cart page)
   - Click on _Order_ link (redirect to orders page)
   - Click on Back to top arrow icon (page is scrolling up)

   All links are working and pointing to correct place.There are no dead links.

9) Products(homepage)
   - Click on selected product card (user is redirected to chosen product on product details page)

## Screenshots

![HomePage](https://github.com/Shrey120/ShopSwift-Frontend/assets/86106616/256339a1-2eb4-4a58-88a7-0803ca1d997b)

![Contact](https://github.com/Shrey120/ShopSwift-Frontend/assets/86106616/4e568f16-58c9-4839-904e-9b71f9d9ec3d)

![Products](https://github.com/Shrey120/ShopSwift-Frontend/assets/86106616/6a4ef091-6f9d-4346-b55e-71f1a37b99f4)

![Single Product](https://github.com/Shrey120/ShopSwift-Frontend/assets/86106616/c3673df7-8f5e-4615-8290-d4f398d97bab)

![Cart Items](https://github.com/Shrey120/ShopSwift-Frontend/assets/86106616/afbc6ae4-2ea0-42b5-a890-33d645fe9087)

![Payment](https://github.com/Shrey120/ShopSwift-Frontend/assets/86106616/3bd808ec-2383-4263-83c3-20eed0a0169e)

![My Orders](https://github.com/Shrey120/ShopSwift-Frontend/assets/86106616/247a948d-134d-4ea0-909a-ee79be0419ba)

![Admin Dashboard](https://github.com/Shrey120/ShopSwift-Frontend/assets/86106616/395bb8dd-27b1-434e-b075-502b4dc9c8a4)

![Users](https://github.com/Shrey120/ShopSwift-Frontend/assets/86106616/cf9a13eb-62a2-4765-8bf5-88666caf08d8)

![Orders](https://github.com/Shrey120/ShopSwift-Frontend/assets/86106616/92ff98a6-1d6f-4806-9042-1685b40e539f)


