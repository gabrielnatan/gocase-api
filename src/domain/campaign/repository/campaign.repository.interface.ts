import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IRepository } from "../../../@sahred/repository/repository.interface.js";
import { Campaign } from "../entity/campaign.entity.js";

export interface ICampaignRepository extends IRepository<Campaign, Uuid> {
    findByInfluencer(influencer: string): Promise<Campaign[]>;
    findActiveCampaigns(): Promise<Campaign[]>;
    findCompletedCampaigns(): Promise<Campaign[]>;
    findPendingCampaigns(): Promise<Campaign[]>;
    findCanceledCampaigns(): Promise<Campaign[]>;
    findArchivedCampaigns(): Promise<Campaign[]>;
}
