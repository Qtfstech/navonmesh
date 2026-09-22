import { useEffect, useRef } from "react";
import * as THREE from "three";

export type Tech3DVariant =
  | "hero-quantum"
  | "overview-torus"
  | "pavilion-matrix"
  | "participate-grid"
  | "registration-portal";

interface TechBackgroundCanvasProps {
  variant?: Tech3DVariant;
  className?: string;
  intensity?: "subtle" | "medium" | "vibrant";
  interactive?: boolean;
}

export function TechBackgroundCanvas({
  variant = "hero-quantum",
  className = "",
  intensity = "medium",
  interactive = true,
}: TechBackgroundCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dimensions
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    // Color palette based on Navonmesh theme (Tech Cyan, Signal Orange, Navy, Emerald, BSNL Blue)
    const colorPrimary = 0x22d3ee; // tech cyan
    const colorSecondary = 0xff6600; // signal orange
    const colorTertiary = 0x10b981; // emerald
    const colorAccent = 0x3b82f6; // BSNL electric blue

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Geometries & Objects based on variant
    const disposables: { dispose: () => void }[] = [];
    const updaters: ((delta: number, elapsed: number) => void)[] = [];

    // --- VARIANT SPECIFIC CREATION ---
    if (variant === "hero-quantum") {
      // "Small things going around": multiple small satellites, micro-nodes, and sparks
      // orbiting along subtle elliptical paths, with NO large obstructing wireframe in the center.
      const orbitsConfig = [
        {
          xRadius: 18,
          yRadius: 9.5,
          rotX: Math.PI / 3.4,
          rotY: Math.PI / 6,
          rotZ: 0.2,
          speed: 0.42,
          startAngle: 0.2,
          color: colorPrimary, // tech cyan
          meshType: "octa",
          size: 0.48,
          pointSize: 0.32,
        },
        {
          xRadius: 15.5,
          yRadius: 11,
          rotX: -Math.PI / 3.8,
          rotY: -Math.PI / 5,
          rotZ: -0.35,
          speed: 0.36,
          startAngle: 2.1,
          color: colorSecondary, // signal saffron/orange
          meshType: "dodeca",
          size: 0.44,
          pointSize: 0.32,
        },
        {
          xRadius: 21,
          yRadius: 8.5,
          rotX: Math.PI / 2.3,
          rotY: -Math.PI / 4,
          rotZ: 0.4,
          speed: -0.28,
          startAngle: 4.3,
          color: colorTertiary, // emerald
          meshType: "tetra",
          size: 0.42,
          pointSize: 0.28,
        },
        {
          xRadius: 14,
          yRadius: 12.5,
          rotX: -Math.PI / 5.5,
          rotY: Math.PI / 3,
          rotZ: -0.15,
          speed: 0.48,
          startAngle: 1.1,
          color: colorAccent, // electric BSNL blue
          meshType: "dual-ring",
          size: 0.46,
          pointSize: 0.3,
        },
        {
          xRadius: 19.5,
          yRadius: 13,
          rotX: 0.35,
          rotY: -0.45,
          rotZ: Math.PI / 3.2,
          speed: -0.38,
          startAngle: 3.4,
          color: 0xffffff, // crystalline white spark
          meshType: "ico",
          size: 0.38,
          pointSize: 0.28,
        },
        {
          xRadius: 12.5,
          yRadius: 7.5,
          rotX: Math.PI / 4,
          rotY: -Math.PI / 7,
          rotZ: 0.6,
          speed: 0.55,
          startAngle: 5.2,
          color: colorPrimary,
          meshType: "octa",
          size: 0.35,
          pointSize: 0.24,
        },
      ];

      orbitsConfig.forEach((cfg) => {
        const orbitGroup = new THREE.Group();
        orbitGroup.rotation.set(cfg.rotX, cfg.rotY, cfg.rotZ);
        rootGroup.add(orbitGroup);

        // A. Subtle hairline orbit trajectory line (whisper-thin, low opacity to keep text 100% readable)
        const curve = new THREE.EllipseCurve(0, 0, cfg.xRadius, cfg.yRadius, 0, 2 * Math.PI, false, 0);
        const curvePoints = curve.getPoints(96);
        const orbitGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
        disposables.push(orbitGeo);
        const orbitMat = new THREE.LineBasicMaterial({
          color: cfg.color,
          transparent: true,
          opacity: intensity === "vibrant" ? 0.16 : 0.1,
        });
        disposables.push(orbitMat);
        const orbitLine = new THREE.Line(orbitGeo, orbitMat);
        orbitGroup.add(orbitLine);

        // B. Small orbiting satellite / micro-node
        const satGroup = new THREE.Group();
        orbitGroup.add(satGroup);

        let satGeo: THREE.BufferGeometry;
        if (cfg.meshType === "octa") {
          satGeo = new THREE.OctahedronGeometry(cfg.size, 0);
        } else if (cfg.meshType === "dodeca") {
          satGeo = new THREE.DodecahedronGeometry(cfg.size, 0);
        } else if (cfg.meshType === "tetra") {
          satGeo = new THREE.TetrahedronGeometry(cfg.size, 0);
        } else if (cfg.meshType === "dual-ring") {
          satGeo = new THREE.TorusGeometry(cfg.size, 0.05, 8, 24);
        } else {
          satGeo = new THREE.IcosahedronGeometry(cfg.size, 0);
        }
        disposables.push(satGeo);

        const satMat = new THREE.MeshBasicMaterial({
          color: cfg.color,
          wireframe: true,
          transparent: true,
          opacity: 0.85,
        });
        disposables.push(satMat);
        const satMesh = new THREE.Mesh(satGeo, satMat);
        satGroup.add(satMesh);

        // Glowing center core point
        const sparkGeo = new THREE.BufferGeometry();
        sparkGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));
        disposables.push(sparkGeo);
        const sparkMat = new THREE.PointsMaterial({
          size: cfg.pointSize,
          color: cfg.color,
          transparent: true,
          opacity: 0.95,
        });
        disposables.push(sparkMat);
        satGroup.add(new THREE.Points(sparkGeo, sparkMat));

        // C. Trailing micro-data packets (fading trail dots following behind)
        const trailCount = 3;
        const trailDots: THREE.Points[] = [];
        for (let t = 1; t <= trailCount; t++) {
          const tGeo = new THREE.BufferGeometry();
          tGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));
          disposables.push(tGeo);
          const tMat = new THREE.PointsMaterial({
            size: cfg.pointSize * (1 - t * 0.22),
            color: cfg.color,
            transparent: true,
            opacity: 0.55 - t * 0.15,
          });
          disposables.push(tMat);
          const tPoint = new THREE.Points(tGeo, tMat);
          orbitGroup.add(tPoint);
          trailDots.push(tPoint);
        }

        // Updater moving the small satellite smoothly along its orbit
        let currentAngle = cfg.startAngle;
        updaters.push((delta) => {
          currentAngle += cfg.speed * delta;
          const x = Math.cos(currentAngle) * cfg.xRadius;
          const y = Math.sin(currentAngle) * cfg.yRadius;
          satGroup.position.set(x, y, 0);

          // Local self-rotation of the satellite
          satMesh.rotation.x += delta * 1.8;
          satMesh.rotation.y += delta * 2.2;

          // Trailing particles
          trailDots.forEach((dot, idx) => {
            const lag = (idx + 1) * 0.08 * Math.sign(cfg.speed);
            const tx = Math.cos(currentAngle - lag) * cfg.xRadius;
            const ty = Math.sin(currentAngle - lag) * cfg.yRadius;
            dot.position.set(tx, ty, 0);
          });
        });
      });

      // 2. Ambient Constellation & Star Node Field with Full Depth
      const particleCount = 140;
      const particleGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 44;
        posArray[i + 1] = (Math.random() - 0.5) * 28;
        posArray[i + 2] = (Math.random() - 0.5) * 22;
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
      disposables.push(particleGeo);

      const particleMat = new THREE.PointsMaterial({
        size: 0.18,
        color: colorPrimary,
        transparent: true,
        opacity: intensity === "vibrant" ? 0.45 : 0.3,
      });
      disposables.push(particleMat);
      const particles = new THREE.Points(particleGeo, particleMat);
      rootGroup.add(particles);

      // Subtle particle cloud drift
      updaters.push((delta) => {
        particles.rotation.y += delta * 0.02;
        particles.rotation.x += delta * 0.01;
      });

      // 3. Subtle Deep Horizon perspective far below
      const horizonGeo = new THREE.PlaneGeometry(60, 24, 20, 10);
      disposables.push(horizonGeo);
      const horizonMat = new THREE.MeshBasicMaterial({
        color: colorPrimary,
        wireframe: true,
        transparent: true,
        opacity: 0.05,
      });
      disposables.push(horizonMat);
      const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
      horizonMesh.position.set(0, -10.5, -8);
      horizonMesh.rotation.x = -Math.PI / 2.3;
      rootGroup.add(horizonMesh);
    } else if (variant === "overview-torus") {
      // Elegant Torus Knot
      const knotGeo = new THREE.TorusKnotGeometry(6.5, 1.4, 100, 16, 2, 3);
      disposables.push(knotGeo);
      const knotMat = new THREE.MeshBasicMaterial({
        color: colorPrimary,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      disposables.push(knotMat);
      const knotMesh = new THREE.Mesh(knotGeo, knotMat);
      rootGroup.add(knotMesh);

      // Surrounding particle ring
      const ringCount = 80;
      const ringGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(ringCount * 3);
      for (let i = 0; i < ringCount; i++) {
        const theta = (i / ringCount) * Math.PI * 2;
        const radius = 12 + Math.random() * 4;
        posArray[i * 3] = Math.cos(theta) * radius;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 6;
        posArray[i * 3 + 2] = Math.sin(theta) * radius;
      }
      ringGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
      disposables.push(ringGeo);
      const ringMat = new THREE.PointsMaterial({
        size: 0.2,
        color: colorAccent,
        transparent: true,
        opacity: 0.5,
      });
      disposables.push(ringMat);
      rootGroup.add(new THREE.Points(ringGeo, ringMat));
    } else if (variant === "pavilion-matrix") {
      // Geodesic Network Sphere
      const sphereGeo = new THREE.IcosahedronGeometry(8.5, 2);
      disposables.push(sphereGeo);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: colorTertiary,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
      });
      disposables.push(sphereMat);
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      rootGroup.add(sphereMesh);

      // Cyber Octahedron satellites
      for (let i = 0; i < 4; i++) {
        const satGeo = new THREE.OctahedronGeometry(1.4, 0);
        disposables.push(satGeo);
        const satMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? colorSecondary : colorPrimary,
          wireframe: true,
          transparent: true,
          opacity: 0.35,
        });
        disposables.push(satMat);
        const sat = new THREE.Mesh(satGeo, satMat);
        const angle = (i / 4) * Math.PI * 2;
        sat.position.set(Math.cos(angle) * 14, Math.sin(angle) * 8, (Math.random() - 0.5) * 4);
        rootGroup.add(sat);
      }
    } else if (variant === "participate-grid") {
      // 3D Polyhedral Crystals floating across depth
      for (let i = 0; i < 6; i++) {
        const dGeo = new THREE.DodecahedronGeometry(2.5 + (i % 3), 0);
        disposables.push(dGeo);
        const dMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? colorPrimary : colorSecondary,
          wireframe: true,
          transparent: true,
          opacity: 0.18,
        });
        disposables.push(dMat);
        const dMesh = new THREE.Mesh(dGeo, dMat);
        dMesh.position.set(
          ((i - 2.5) / 3) * 20,
          Math.sin(i) * 7,
          (i % 2 === 0 ? -4 : 2)
        );
        dMesh.rotation.set(i * 0.4, i * 0.6, 0);
        rootGroup.add(dMesh);
      }
    } else {
      // registration-portal
      const cylinderGeo = new THREE.CylinderGeometry(8, 8, 14, 24, 6, true);
      disposables.push(cylinderGeo);
      const cylinderMat = new THREE.MeshBasicMaterial({
        color: colorPrimary,
        wireframe: true,
        transparent: true,
        opacity: 0.14,
      });
      disposables.push(cylinderMat);
      const cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
      cylinderMesh.rotation.x = Math.PI / 3;
      rootGroup.add(cylinderMesh);
    }

    // Mouse tracking state
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let isHovering = false;

    // Window Mouse Listener for effortless, fluid parallax across the hero
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const x = (e.clientX / (window.innerWidth || 1920)) * 2 - 1;
      const y = -((e.clientY / (window.innerHeight || 1080)) * 2 - 1);
      targetMouseX = Math.max(-1, Math.min(1, x));
      targetMouseY = Math.max(-1, Math.min(1, y));
      isHovering = true;
    };

    const handleMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
      isHovering = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Intersection Observer to pause rendering when out of viewport
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      const lerpFactor = 0.045;
      currentMouseX += (targetMouseX - currentMouseX) * lerpFactor;
      currentMouseY += (targetMouseY - currentMouseY) * lerpFactor;

      // Base rotation - smooth and majestic
      if (!prefersReducedMotion) {
        rootGroup.rotation.y += delta * (variant === "hero-quantum" ? 0.14 : 0.22);
        rootGroup.rotation.x += delta * (variant === "hero-quantum" ? 0.05 : 0.08);
      }

      // Interactive mouse response: dynamic tilt and parallax
      rootGroup.rotation.y += currentMouseX * (variant === "hero-quantum" ? 0.018 : 0.02);
      rootGroup.rotation.x += -currentMouseY * (variant === "hero-quantum" ? 0.015 : 0.02);
      rootGroup.position.x = currentMouseX * (variant === "hero-quantum" ? 1.4 : 1.8);
      rootGroup.position.y = currentMouseY * (variant === "hero-quantum" ? 1.1 : 1.4);

      // Subtle breathing scale
      const breath = Math.sin(elapsedTime * 1.5) * 0.03 + 1;
      rootGroup.scale.set(breath, breath, breath);

      // Execute per-frame animations (orbiting satellites, micro-nodes, trail packets)
      updaters.forEach((fn) => fn(delta, elapsedTime));

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);

      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [variant, intensity, interactive]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  );
}
