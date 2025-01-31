export interface ExceptionResponse {
  businessErrorCode: string;
  businessErrorDescription: string;
  error: string;
  validationErrors?: Set<string>;
}