import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Campaign } from "../../../domain/campaign/entity/campaign.entity.js";
import { ICampaignRepository } from "../../../domain/campaign/repository/campaign.repository.interface.js";
import { CampaignOutput, CampaignOutputMapper } from "../common/campaign-output.js";

export class CreateCampaignUseCase implements IUseCase<CreateCampaignUseCaseInput, CreateCampaignUseCaseOutput> {
    constructor(private readonly campaignRepo: ICampaignRepository) {}

    async execute(input: CreateCampaignUseCaseInput): Promise<CampaignOutput> {
        const { name, goal,status, products, content_type, hashtags, influencers, dates, materials } = input;
        
        const entity = new Campaign({
            name,
            goal,
            products,
            content_type,
            status,
            hashtags,
            influencers,
            dates,
            materials,
            created_at: new Date(),
        });

        console.log("ENTITY ", entity);
        await this.campaignRepo.insert(entity);
        return CampaignOutputMapper.toOutput(entity);
    }
}

interface CreateCampaignUseCaseInput {
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
}

type CreateCampaignUseCaseOutput = CampaignOutput;
