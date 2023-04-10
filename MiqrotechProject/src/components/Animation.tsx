import React, { useCallback, useRef, Suspense, useEffect, useMemo } from 'react'

import { Vector2, Clock, TextureLoader, ShaderMaterial } from 'three'
import { lerp } from "three/src/math/MathUtils"

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'

import vertexShader from '@shaders/binary/vertex.glsl'
import fragmentShader from '@shaders/binary/fragment.glsl'

import BinaryTexturePNG from '@png/binary.png'

const Animation: React.FC<{followMouse?: boolean}> = ({followMouse}) => {
  const canvas = useRef(null)

  return (
    <Canvas mode="concurrent" dpr={1} ref={canvas} resize={{ scroll: false}}>
      <Suspense fallback={<></>}>
        <Plane
          canvas={canvas}
          followMouse={followMouse}
        />
      </Suspense>
    </Canvas>
  )
}

export default Animation

const Plane: React.FC<{canvas: any, followMouse?: boolean}> = ({canvas, followMouse}) => {

  const cursor = useRef(new Vector2(0, 0))
  const mouse = useRef(new Vector2(0, 0))
  const dpr = Math.min(window.devicePixelRatio, 2)

  const { camera } = useThree()
  camera.rotation.x = Math.PI / 6
  camera.position.x = 0
  camera.position.y = -0.5
  camera.position.z = 6


  const clock = useRef(new Clock())

  const mesh = useRef()

  const texture = useLoader(TextureLoader, BinaryTexturePNG)
  texture.wrapS = 1000
  texture.wrapT = 1000

  const material = useMemo(() => new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uFrequency: { value: new Vector2(0.6, 0.4) },
      uTime: { value: 0 },
      uTexture: { value: texture },
      uTextureRepeat: { value: 6},
      uMousePos: { value: new Vector2(1.0, 1.0) },
      uMouseDelta: { value: 0 }
    }
  }), [vertexShader, fragmentShader, texture])

  const handleMouseMove = useCallback(e => {
    if (canvas.current) {
      mouse.current = new Vector2( e.offsetX * dpr, (canvas.current.clientHeight - e.offsetY) * dpr)
    }
  }, [dpr])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, {passive: true})
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  useFrame(() => {
    const elapsedTime = clock.current.getElapsedTime()
    material.uniforms.uTime.value = elapsedTime

    if (followMouse) {
      cursor.current.x = lerp(cursor.current.x, mouse.current.x, 0.05)
      cursor.current.y = lerp(cursor.current.y, mouse.current.y, 0.05)

      material.uniforms.uMousePos.value.set(cursor.current.x, cursor.current.y)
      material.uniforms.uMouseDelta.value = mouse.current.distanceTo(cursor.current)
    }

  })

  return (
    <mesh
      ref={mesh}
      scale={10}
      material={material}
    >
      <planeGeometry args={[4, 2, 64, 32]} />
    </mesh>
  )
}
