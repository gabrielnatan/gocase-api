import mongoose, { Document, Model, Schema } from "mongoose";
import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";

export interface ICampaign extends Document {
    id: string;
    name: string;
    goal: string;
    products: string;
    content_type: string;
    hashtags: string[];
    influencers: string[];
    dates: {
        entrega: Date;
        publicacao: Date;
    };
    status: 'active' | 'completed' | 'pending' | 'canceled' | 'archived';
    materials: string[];
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

const CampaignSchema: Schema = new Schema<ICampaign>({
    id: { 
        type: String, 
        required: true, 
        unique: true,
        default: () => new Uuid().id,
        validate: {
          validator: function(v: string) {
            return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
          },
          message: (props) => `${props.value} não é um UUID válido!`
        }
    },
    name: { type: String, required: true },
    goal: { type: String, required: true },
    products: { type: String, required: true },
    content_type: { type: String, required: true },
    hashtags: { type: [String], required: true },
    influencers: { type: [String], required: true },
    dates: {
        type: {
            entrega: { type: Date, required: true },
            publicacao: { type: Date, required: true }
        },
        required: true
    },
    status: { 
        type: String, 
        required: true, 
        enum: ['active', 'completed', 'pending', 'canceled', 'archived'], 
        default: 'pending'
    },
    materials: { type: [String], required: true },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});

export const CampaignModel: Model<ICampaign> = mongoose.model<ICampaign>(
  'Campaign',
  CampaignSchema
);
