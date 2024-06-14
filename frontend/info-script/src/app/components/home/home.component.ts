import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <body>
  <header>
    <div class="container">
      <p>Effortlessly transcribe and summarize your audio files</p>
      <a href="#features" class="btn-primary">Learn More</a>
    </div>
  </header>
  <main>
    <section id="photo">
      <div>
        <img src = "https://www.onlygfx.com/wp-content/uploads/2022/03/colorful-sound-wave-equalizer-4.png">
        </div>
      </section>
    <section id="features">
      <div class="container">
        <h2>Features</h2>
        <div class="features-grid">
          <div class="feature-item">
            <h3>Accurate Transcriptions</h3>
            <p>Get highly accurate transcriptions of your MP3 and MP4 files powered by Deepgram's AI technology.</p>
          </div>
          <div class="feature-item">
            <h3>Summarization</h3>
            <p>Summarize lengthy audio content into concise text summaries for quick understanding.</p>
          </div>
          <div class="feature-item">
            <h3>Searchable Transcripts</h3>
            <p>Easily find specific mentions of words or phrases within your transcripts.</p>
          </div>
          <div class="feature-item">
            <h3>User-friendly Interface</h3>
            <p>Navigate through our clean and intuitive interface with ease.</p>
          </div>
        </div>
      </div>
    </section>
    <section id="cta">
      <div class="container">
        <h2>Get Started with InfoScript</h2>
        <p>Sign up today and start transcribing and summarizing your audio files effortlessly.</p>
        <a href="/signup" class="btn-primary">Sign Up Now</a>
      </div>
    </section>
  </main>
  <footer>
    <div class="container">
      <p>&copy; 2024 InfoScript. All rights reserved.</p>
    </div>
  </footer>
</body>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
