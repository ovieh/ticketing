import * as mongoose from 'mongoose';

interface TicketAttrs {
	price: number;
	title: string;
	userId: string;
	date: Date;
}

export interface TicketDocument extends mongoose.Document {
	price: number;
	title: string;
	userId: string;
	date: Date;
	version: number;
	orderId?: string;
}

interface TicketModel extends mongoose.Model<TicketDocument> {
	build(attrs: TicketAttrs): TicketDocument;
}

const ticketSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		orderId: {
			type: String,
		},
		date: {
			type: Date,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret): void {
				ret.id = ret._id;
				delete ret._id;
			},
		},
	}
);
// ticketSchema.set('versionKey', 'version');
// ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs): TicketDocument => {
  return new Ticket(attrs);
};

const Ticket =
	mongoose.models.Ticket || mongoose.model<TicketDocument, TicketModel>('Ticket', ticketSchema);

export { Ticket };
