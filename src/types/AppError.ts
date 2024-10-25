export class AppError extends Error {
  public title: string;
  public animationSrc: string;
  public buttonText: string;

  constructor(title: string, message: string, animationSrc: string, buttonText: string) {
    super(message);
    this.title = title;
    this.animationSrc = animationSrc;
    this.buttonText = buttonText;
  }
}