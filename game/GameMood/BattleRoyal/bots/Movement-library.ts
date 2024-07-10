class MoverTS {
  public element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
    this.element.style.position = 'absolute'; // Imposta position: absolute
  }

  achieve = {
    setXY: (x: number, y: number): void => {
      this.element.style.left = `${x}px`;
      this.element.style.top = `${y}px`;
    },

    randomXY: (): void => {
      this.achieve.setXY(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
    },

    idElement: (id: string): void => {
      const target = document.getElementById(id);
      if (target) {
        const rect = target.getBoundingClientRect();
        this.achieve.setXY(rect.left + window.scrollX, rect.top + window.scrollY);
      } else {
        console.error("The element with the id: " + id + " doesn't exist.");
      }
    },

    mouseFromEvent: (mouseEvent: MouseEvent): void => {
      const x = mouseEvent.clientX;
      const y = mouseEvent.clientY;
      this.achieve.setXY(x, y);
    },

    /*mouse: (): void => {
      const moveToMouse = (event: MouseEvent): void => {
        const x = event.clientX;
        const y = event.clientY;
        this.achieve.setXY(x, y);
      };
      document.addEventListener('mousemove', moveToMouse, { once: true });
    }*/
  }

  getRandomX(): number {
    return (Math.random() * window.innerWidth)
  }

  getRandomY(): number {
    return (Math.random() * window.innerHeight)
  }

  glideAt(x: number, y: number, seconds: number): void {
    this.element.style.transition = `left ${seconds}s, top ${seconds}s`; // Animazione su left e top
    this.achieve.setXY(x, y);
    setTimeout(() => {
      this.element.style.transition = ''; // Rimuove la transizione dopo che è completata
    }, seconds * 1000);
  }

  glideAtIdElement(id: string, seconds: number): void {
    const target = document.getElementById(id);
    if (target) {
      const rect = target.getBoundingClientRect();
      const startX = parseInt(this.element.style.left) || 0;
      const startY = parseInt(this.element.style.top) || 0;
      const endX = rect.left + window.scrollX;
      const endY = rect.top + window.scrollY;
      const distanceX = endX - startX;
      const distanceY = endY - startY;
      this.element.style.transition = `left ${seconds}s, top ${seconds}s`; // Animazione su left e top
      this.achieve.setXY(startX + distanceX, startY + distanceY);
      setTimeout(() => {
        this.element.style.transition = ''; // Rimuove la transizione dopo che è completata
      }, seconds * 1000);
    } else {
      console.error("The element with the id: " + id + " doesn't exist.");
    }
  }

  punteInDirection(degrees: number): void {
    this.element.style.transform = `rotate(${degrees}deg)`;
  }

  punteTowardsId(targetId: string): void {
    const target = document.getElementById(targetId);
    if (target) {
      const rect = target.getBoundingClientRect();
      const elementRect = this.element.getBoundingClientRect();
      const deltaX = rect.left - elementRect.left;
      const deltaY = rect.top - elementRect.top;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      this.punteInDirection(angle);
    } else {
      console.error("The element with the id: " + targetId + " doesn't exist.");
    }
  }

  changeX(dx: number): void {
    const currentX = parseInt(this.element.style.left) || 0;
    this.achieve.setXY(currentX + dx, parseInt(this.element.style.top) || 0);
  }

  changeY(dy: number): void {
    const currentY = parseInt(this.element.style.top) || 0;
    this.achieve.setXY(parseInt(this.element.style.left) || 0, currentY + dy);
  }
}