class NetsiDownload extends HTMLElement {
  static get observedAttributes() {
    return ["data", "mime-type", "ondownloaded", "filename"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                :host { display: inline-block; cursor: pointer; }
                ::slotted(*) { pointer-events: none; }
            </style>
            <slot></slot>
        `;
    this.getDataAndSetDefaultValues.bind(this);
  }

  connectedCallback() {
    this.addEventListener("click", this.downloadData);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.downloadData);
  }

  downloadData = () => {
    const dataString = this.getDataAndSetDefaultValues();

    const mimeType = this.getAttribute("mime-type") || this.defaultMimeType;
    const filename = this.getAttribute("filename") || this.defaultFilename;
    const blob = new Blob([dataString], { type: mimeType });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    this.triggerDownloadCallback();
  };

  getDataAndSetDefaultValues() {
    let data = this.getAttribute("data");
    this.defaultFilename = "data.txt";
    this.defaultMimeType = "text/plain";
    try {
      const element = document.querySelector(data);
      const tagName = element.tagName.toLowerCase();

      data = element.outerHTML;
      if (element.namespaceURI === "http://www.w3.org/2000/svg") {
        this.defaultFilename = "svg.svg";
        this.defaultMimeType = "image/svg+xml";
      } else {
        if (tagName === "textarea" || "value" in element) {
          this.defaultFilename = "value.txt";
          data = "value" in element ? element.value : element.textContent;
        } else {
          this.defaultFilename = "data.html";
          this.defaultMimeType = "text/html";
        }
      }
    } catch (e) {
      // ignore
    }
    return data;
  }

  triggerDownloadCallback() {
    const downloadCallback = this.getAttribute("ondownloaded");
    if (downloadCallback && typeof window[downloadCallback] === "function") {
      window[downloadCallback]();
    }
  }
}

customElements.define("netsi-download", NetsiDownload);
