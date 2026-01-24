import mongoose, { Schema, type Model } from "mongoose";

type Agent = {
  name: string;
  email: string;
  passwordHash: string;
  isActive: boolean;
  createdAt: Date;
};

type AgentSession = {
  agentId: mongoose.Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
};

type Reservation = {
  tripId: string;
  date: string;      // YYYY-MM-DD
  slotId: string;
  quantity: number;

  bookingMode: "private" | "shared"; // ✅ ADD

  customerName: string;
  customerPhone: string;
  customerEmail?: string;

  source: "agent" | "web";
  agentId?: mongoose.Types.ObjectId;

  paymentStatus: "pay_on_arrival" | "paid_to_agent" | "invoice";
  notes?: string;

  status: "confirmed" | "cancelled";
  createdAt: Date;
};


const AgentSchema = new Schema<Agent>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true, unique: true },
    passwordHash: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, required: true, default: () => new Date() },
  },
  { collection: "agents" }
);

const AgentSessionSchema = new Schema<AgentSession>(
  {
    agentId: { type: Schema.Types.ObjectId, required: true, index: true, ref: "Agent" },
    tokenHash: { type: String, required: true, index: true, unique: true },
    expiresAt: { type: Date, required: true, index: true },
    createdAt: { type: Date, required: true, default: () => new Date() },
  },
  { collection: "agent_sessions" }
);

// TTL index (Mongo will auto-delete expired sessions)
AgentSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const ReservationSchema = new Schema<Reservation>(
  {
    tripId: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true },
    slotId: { type: String, required: true, index: true },
    quantity: { type: Number, required: true, min: 1 },

    bookingMode: { type: String, required: true, enum: ["private", "shared"], default: "shared", index: true }, // ✅ ADD

    customerName: { type: String, required: true, trim: true },
    customerPhone: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: false, trim: true },

    source: { type: String, required: true, enum: ["agent", "web"], index: true },
    agentId: { type: Schema.Types.ObjectId, required: false, index: true, ref: "Agent" },

    paymentStatus: { type: String, required: true, enum: ["pay_on_arrival", "paid_to_agent", "invoice"], index: true },
    notes: { type: String, required: false, trim: true },

    status: { type: String, required: true, enum: ["confirmed", "cancelled"], index: true, default: "confirmed" },
    createdAt: { type: Date, required: true, default: () => new Date() },
  },
  { collection: "reservations" }
);


export const AgentModel: Model<Agent> =
  (mongoose.models.Agent as Model<Agent>) || mongoose.model<Agent>("Agent", AgentSchema);

export const AgentSessionModel: Model<AgentSession> =
  (mongoose.models.AgentSession as Model<AgentSession>) || mongoose.model<AgentSession>("AgentSession", AgentSessionSchema);

export const ReservationModel: Model<Reservation> =
  (mongoose.models.Reservation as Model<Reservation>) || mongoose.model<Reservation>("Reservation", ReservationSchema);
