import { z } from 'zod';

// Resume upload validation schema
export const resumeUploadSchema = z.object({
    userId: z.string().min(1, 'User ID is required'),
    originalFilename: z.string().min(1, 'Original filename is required'),
    storedFilename: z.string().min(1, 'Stored filename is required'),
    filePath: z.string().min(1, 'File path is required'),
    fileSize: z.number().positive('File size must be positive'),
    fileType: z.enum(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
    uploadDate: z.date().default(() => new Date()),
});

// Resume file validation
export const resumeFileSchema = z.object({
    name: z.string().min(1, 'Filename is required'),
    size: z.number().max(5 * 1024 * 1024, 'File size must be less than 5MB'),
    type: z.enum(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], {
        errorMap: () => ({ message: 'Only PDF and Word documents are allowed' })
    }),
});

// Type definitions
export type ResumeUpload = z.infer<typeof resumeUploadSchema>;
export type ResumeFile = z.infer<typeof resumeFileSchema>;

// Database schema (example for various ORMs)
/*
// Prisma Schema
model Resume {
  id              String   @id @default(cuid())
  userId          String
  originalFilename String
  storedFilename  String
  filePath        String
  fileSize        Int
  fileType        String
  uploadDate      DateTime @default(now())
  isActive        Boolean  @default(true)
  
  @@map("resumes")
}

// Drizzle Schema (if using PostgreSQL)
export const resumes = pgTable('resumes', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  originalFilename: varchar('original_filename', { length: 255 }).notNull(),
  storedFilename: varchar('stored_filename', { length: 255 }).notNull(),
  filePath: varchar('file_path', { length: 500 }).notNull(),
  fileSize: integer('file_size').notNull(),
  fileType: varchar('file_type', { length: 100 }).notNull(),
  uploadDate: timestamp('upload_date').defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
});

// MongoDB Schema (if using Mongoose)
const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  originalFilename: { type: String, required: true },
  storedFilename: { type: String, required: true },
  filePath: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileType: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});
*/
