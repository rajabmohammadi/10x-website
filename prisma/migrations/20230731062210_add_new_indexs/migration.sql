-- CreateIndex
CREATE FULLTEXT INDEX `used_carparts_Title_Modell_Hersteller_idx` ON `used_carparts`(`Title`, `Modell`, `Hersteller`);
