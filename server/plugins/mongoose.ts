import { defineNitroPlugin, useRuntimeConfig } from '#imports';
import mongoose from 'mongoose';

export default defineNitroPlugin(async () => {
    const config = useRuntimeConfig();
    const uri = config.mongodbUri;
    
    if (!uri) {
        throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(uri as string);
});