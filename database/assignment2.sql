# SQL Statements for Assignment 2

-- Insert a new record into the account table
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Modify the Tony Stark record to change the account_type to "Admin"
UPDATE public.account
SET account_type = 'Admin'::account_type
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Delete the Tony Stark record from the database
DELETE FROM public.account
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Modify the "GM Hummer" record description
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_model = 'GM Hummer';

-- Select make and model from inventory and classification name for "Sport" category
SELECT inv_make, inv_model, c.classification_name
FROM public.inventory i
INNER JOIN public.classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- Update all records in the inventory table to add "/vehicles" to the file path
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');