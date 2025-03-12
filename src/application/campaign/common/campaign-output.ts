import { Campaign } from "../../../domain/campaign/entity/campaign.entity.js";

export type CampaignOutput = {
  id: string;
  name: string;
  goal: string;
  products: string;
  content_type: string;
  hashtags: string[];
  influencers: string[];
  status: 'active' | 'completed' | 'pending' | 'canceled' | 'archived';
  dates: {
    entrega: Date;
    publicacao: Date;
  };
  materials: string[];
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};

export class CampaignOutputMapper {
  static toOutput(entity: Campaign): CampaignOutput {
    const {
      id,
      name,
      goal,
      products,
      content_type,
      hashtags,
      influencers,
      status,
      dates,
      materials,
      created_at,
      updated_at,
      deleted_at,
    } = entity.toJSON();
    
    return {
      id: id.id,
      name,
      goal,
      products,
      content_type,
      hashtags,
      influencers,
      status,
      dates,
      materials,
      created_at,
      updated_at,
      deleted_at,
    };
  }
}
