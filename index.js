class NetsiDownload extends HTMLElement {
  static get observedAttributes() {
    return ["data", "mime-type", "ondownloaded"];
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
  }

  connectedCallback() {
    this.addEventListener("click", this.downloadData);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.downloadData);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Handle attribute changes if necessary
  }

  downloadData = () => {
    const dataId = this.getAttribute("data");
    const mimeType = this.getAttribute("mime-type") || "image/svg+xml";
    const dataElement = document.getElementById(dataId);
    if (!dataElement) {
      console.error("Data element not found");
      return;
    }

    const serializer = new XMLSerializer();
    const dataString = serializer.serializeToString(dataElement);
    const blob = new Blob([dataString], { type: mimeType });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${dataId}.svg`;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    this.triggerDownloadCallback();
  };

  triggerDownloadCallback() {
    const downloadCallback = this.getAttribute("ondownloaded");
    if (downloadCallback && typeof window[downloadCallback] === "function") {
      window[downloadCallback]();
    }
  }
}

customElements.define("netsi-download", NetsiDownload);
