--(c) Nnachi, Joseph Otu


-- DATABASE ASSIGNMENT: TASK 1 --
-- Insert the Tony Stark Data
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');


-- Update the account_type to "Admin" for the inserted record
UPDATE public.account
SET account_type = 'Admin'::account_type
WHERE account_email = 'tony@starkent.com';

-- Delete Tony Stark data
DELETE FROM public.account
WHERE account_email = 'tony@starkent.com';

-- UPDATING "GM"
UPDATE public.inventory
SET inv_description = 'Do you have 6 kids and like to go offroading? The Hummer gives you a huge interior with an engine to get you out of any muddy or rocky situation.'
WHERE inv_make = 'GM' AND inv_model = 'Hummer' AND inv_year = '2016';

-- CREATING THE SPORT CATEGORY --
SELECT inv.inv_make, inv.inv_model, cls.classification_name
FROM public.inventory AS inv
INNER JOIN public.classification AS cls ON inv.classification_id = cls.classification_id
WHERE cls.classification_name = 'Sport';

UPDATE public.inventory
SET inv_image = REPLACE(
  inv_image,
  '/images/',
  '/images/vehicles/'
), inv_thumbnail = REPLACE(
  inv_thumbnail,
  '/images/',
  '/images/vehicles/'
);