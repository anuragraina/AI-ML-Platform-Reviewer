import mongoose, { Schema } from 'mongoose';

interface IPlatform {
	name: string;
	description: string;
	features: string[];
	differentiators: string[];
	clients: string[];
	industries: string[];
	pricing: string;
	markdownPath: string;
}

const platformSchema = new Schema<IPlatform>({
	name: { type: String, required: true, unique: true },
	description: { type: String, default: 'NA' },
	features: { type: [String], default: [] },
	differentiators: { type: [String], default: [] },
	clients: { type: [String], default: [] },
	industries: { type: [String], default: [] },
	pricing: { type: String, default: 'NA' },
	markdownPath: { type: String, required: true },
});

export default mongoose.model<IPlatform>('Platform', platformSchema);
