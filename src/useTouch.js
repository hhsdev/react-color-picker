import React, { useRef, useEffect, useCallback } from "react";

export default function useTouch(eventRef, callback) {
  const touchId = useRef();

  const trackFingerPosition = (event, touchId) => {
    // mozilla has a bug in responsive design mode where event.changedTouches
    // are empty on a touchend event:
    //    https://bugzilla.mozilla.org/show_bug.cgi?id=1615824
    // as a workaround, this currently returns true on a touchend event.
    // Delete this after the bug has been resolved!
    if (event.type === "touchend" && event.changedTouches.length === 0) {
      return true;
    }

    if (touchId.current !== undefined && event.changedTouches) {
      for (let i = 0; i < event.changedTouches.length; i += 1) {
        const touch = event.changedTouches[i];
        if (touch.identifier === touchId.current) {
          return {
            x: touch.clientX,
            y: touch.clientY,
          };
        }
      }
      return false;
    }
    return {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleTouchStart = (event) => {
    event.preventDefault();
    const touch = event.changedTouches[0];
    if (touch != null) {
      touchId.current = touch.identifier;
    }

    const fingerPosition = trackFingerPosition(event, touchId);
    callback(fingerPosition);
    console.log("touchmove attached");
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (event) => {
    const finger = trackFingerPosition(event, touchId);
    if (!finger) return;
    callback(finger);
  };

  const handleTouchEnd = (event) => {
    touchId.current = undefined;

    const fingerPosition = trackFingerPosition(event, touchId);

    if (!fingerPosition) return;
    document.removeEventListener("mousemove", handleTouchMove);
    document.removeEventListener("mouseup", handleTouchEnd);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  useEffect(() => {
    if (!eventRef.current) return;
    eventRef.current.addEventListener("touchstart", handleTouchStart);
    eventRef.current.addEventListener("mousedown", handleMouseDown);
    console.log("this shouldn't run so many times");
    return () => {
      console.log('touchmove removed');
      eventRef.current.removeEventListener("mousedown", handleMouseDown);
      eventRef.current.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("mousemove", handleTouchMove);
      document.removeEventListener("mouseup", handleTouchEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [!!eventRef.current]);

  const handleMouseDown = (e) => {
    callback({ x: e.clientX, y: e.clientY });
    document.body.style["pointer-events"] = "none";

    document.addEventListener("mouseup", handleMouseUp, { capture: true });
    document.addEventListener("mousemove", handleMouseMove, { capture: true });
    e.stopPropagation();
  };

  const handleMouseUp = (e) => {
    document.body.style["pointer-events"] = "auto";
    document.removeEventListener("mouseup", handleMouseUp, { capture: true });
    document.removeEventListener("mousemove", handleMouseMove, {
      capture: true,
    });
    e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    callback({ x: e.clientX, y: e.clientY });
    e.stopPropagation();
  };
}
