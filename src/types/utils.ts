export interface FileOperationResult {
  success: boolean;
  message: string;
}

export interface FileReadOptions {
  encoding?: BufferEncoding;
  flag?: string;
}
