import mongoose from 'mongoose';

const payloadSchema = new mongoose.Schema({
    mastermind: { 
        type: String, 
        required: true,
        enum: ['Alt Cunningham', 'Arnim Zola', 'Agent Smith', 'Dr. Connors']
    },
    hiddenCode: { 
        type: String, 
        required: true 
    },
    variantName: { 
        type: String, 
        default: 'Pi Variant' 
    },
    classification: { 
        type: String, 
        default: 'Under Monitoring' 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

export const Payload = mongoose.model('Payload', payloadSchema);