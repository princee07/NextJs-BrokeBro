export interface StudentFormData {
    studentName: string;
    collegeName: string;
    rollNo: string;
    state: string;
}

export interface DocumentUpload {
    studentIdCard?: File;
    feeReceipt?: File;
    studentEmail?: string;
    uploadMethod: 'document' | 'email';
}

export interface VerificationStatus {
    id: string;
    userId: string;
    userEmail?: string;
    status: 'pending' | 'under_review' | 'approved' | 'rejected';
    submittedAt: Date;
    reviewedAt?: Date;
    adminNotes?: string;
    studentData: StudentFormData;
    documents?: {
        idCardUrl?: string;
        feeReceiptUrl?: string;
        studentEmail?: string;
    };
}

export interface VerificationStep {
    step: number;
    title: string;
    description: string;
    isCompleted: boolean;
    isActive: boolean;
}

export type VerificationStage = 1 | 2 | 3;
