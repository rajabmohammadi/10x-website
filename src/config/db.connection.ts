import mongoose from 'mongoose';

class DatabaseConnector {

    async connect(databaseName: string): Promise<void> {
        try {
            let url: string = `${process.env.MONGOD_DB_URL}/${databaseName}`;
            await mongoose.connect(url);
            console.log('Connected to the database.');
        } catch (error) {
            console.error('Failed to connect to the database:', error);
        }
    }

    async disconnect(): Promise<void> {
        try {
            await mongoose.disconnect();
            console.log('Disconnected from the database.');
        } catch (error) {
            console.error('Failed to disconnect from the database:', error);
        }
    }
}

export default new DatabaseConnector();
