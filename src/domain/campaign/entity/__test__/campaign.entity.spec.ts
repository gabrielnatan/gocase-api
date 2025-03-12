import { beforeAll, describe, expect, it } from 'vitest';
import { Campaign, CampaignProps } from '../campaign.entity.js';
import { Uuid } from '../../../../@sahred/domain/value-object/uuid/uuid.entity.js';

describe('[Campaign entity]', () => {
    let mockCampaign: CampaignProps;

    beforeAll(() => {
        const uuid = new Uuid();
        mockCampaign = {
            id: uuid,
            name: "Dominando o Verão com a Gocase",
            goal: "Expandir a marca para surfistas e skatistas",
            products: "Capinha de Skate (#5870), Capinha de Surf (#7841)",
            content_type: "Reels, Stories, Feed Posts",
            hashtags: ["#DominandoOVerão", "#GocaseSurf", "#GocaseSkate"],
            influencers: ["@surfista_pro", "@skater_life", "@beachvibes"],
            dates: {
                entrega: new Date("2025-03-10"),
                publicacao: new Date("2025-03-15"),
            },
            status: "pending", // Status padrão
            materials: [
                "https://exemplo.com/material1",
                "https://exemplo.com/material2"
            ],
            created_at: new Date(),
            updated_at: undefined,
            deleted_at: undefined
        };
    });

    it("should create a Campaign", () => {
        const campaign = new Campaign(mockCampaign);

        expect(campaign).toBeInstanceOf(Campaign);
        expect(campaign.id).toBe(mockCampaign.id);
        expect(campaign.name).toBe(mockCampaign.name);
        expect(campaign.goal).toBe(mockCampaign.goal);
        expect(campaign.products).toBe(mockCampaign.products);
        expect(campaign.content_type).toBe(mockCampaign.content_type);
        expect(campaign.hashtags).toStrictEqual(mockCampaign.hashtags);
        expect(campaign.influencers).toStrictEqual(mockCampaign.influencers);
        expect(campaign.dates).toStrictEqual(mockCampaign.dates);
        expect(campaign.status).toBe(mockCampaign.status);
        expect(campaign.materials).toStrictEqual(mockCampaign.materials);
    });

    it("should create a Campaign with the static create method", () => {
        const campaign = Campaign.create(mockCampaign);

        expect(campaign).toBeInstanceOf(Campaign);
        expect(campaign.id).toBe(mockCampaign.id);
        expect(campaign.name).toBe(mockCampaign.name);
        expect(campaign.goal).toBe(mockCampaign.goal);
        expect(campaign.products).toBe(mockCampaign.products);
        expect(campaign.content_type).toBe(mockCampaign.content_type);
        expect(campaign.hashtags).toStrictEqual(mockCampaign.hashtags);
        expect(campaign.influencers).toStrictEqual(mockCampaign.influencers);
        expect(campaign.dates).toStrictEqual(mockCampaign.dates);
        expect(campaign.status).toBe(mockCampaign.status);
        expect(campaign.materials).toStrictEqual(mockCampaign.materials);
        expect(campaign.id).toBeInstanceOf(Uuid);
    });

    it("should return a JSON representation of the Campaign", () => {
        const campaign = new Campaign(mockCampaign);

        expect(campaign.toJSON()).toStrictEqual({
            id: campaign.id,
            name: campaign.name,
            goal: campaign.goal,
            products: campaign.products,
            content_type: campaign.content_type,
            hashtags: campaign.hashtags,
            influencers: campaign.influencers,
            dates: campaign.dates,
            status: campaign.status,
            materials: campaign.materials,
            created_at: campaign.created_at,
            updated_at: campaign.updated_at,
            deleted_at: campaign.deleted_at,
        });
    });

    it("should create a Campaign and generate an ID if not provided", () => {
        const campaign = new Campaign(mockCampaign);

        expect(campaign).toBeInstanceOf(Campaign);
        expect(campaign.id).toBeDefined();
        expect(campaign.id).toBeInstanceOf(Uuid);
    });

    it("should update the campaign name", () => {
        const campaign = new Campaign(mockCampaign);
        campaign.changeName("Nova Campanha de Verão");

        expect(campaign.name).toBe("Nova Campanha de Verão");
    });

    it("should update the campaign goal", () => {
        const campaign = new Campaign(mockCampaign);
        campaign.changeGoal("Expandir para novos mercados");

        expect(campaign.goal).toBe("Expandir para novos mercados");
    });

    it("should update the campaign products", () => {
        const campaign = new Campaign(mockCampaign);
        campaign.changeProducts("Novo Produto XYZ");

        expect(campaign.products).toBe("Novo Produto XYZ");
    });

    it("should update the campaign content type", () => {
        const campaign = new Campaign(mockCampaign);
        campaign.changeContentType("YouTube Videos");

        expect(campaign.content_type).toBe("YouTube Videos");
    });

    it("should update the campaign hashtags", () => {
        const campaign = new Campaign(mockCampaign);
        campaign.changeHashtags(["#NewHashtag"]);

        expect(campaign.hashtags).toStrictEqual(["#NewHashtag"]);
    });

    it("should update the campaign influencers", () => {
        const campaign = new Campaign(mockCampaign);
        campaign.changeInfluencers(["@new_influencer"]);

        expect(campaign.influencers).toStrictEqual(["@new_influencer"]);
    });

    it("should update the campaign dates", () => {
        const campaign = new Campaign(mockCampaign);
        const newDates = {
            entrega: new Date("2025-04-01"),
            publicacao: new Date("2025-04-10"),
        };
        campaign.changeDates(newDates);

        expect(campaign.dates).toStrictEqual(newDates);
    });

    it("should update the campaign materials", () => {
        const campaign = new Campaign(mockCampaign);
        campaign.changeMaterials(["https://novo-material.com"]);

        expect(campaign.materials).toStrictEqual(["https://novo-material.com"]);
    });

    it("should update the campaign status", () => {
        const campaign = new Campaign(mockCampaign);
        campaign.changeStatus("completed");

        expect(campaign.status).toBe("completed");
    });
});
