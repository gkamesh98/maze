import { useCallback, useEffect, useState } from 'react';
import mazeGenerator from '../mazeGenerator';

export const useGenerateHook = (height, width) => {
  const [mazeWalls, setMazeWalls] = useState(mazeGenerator(height, width));
  // useEffect(() => {
  //   forceGenerateMaze();
  // }, [forceGenerateMaze]);

  const forceGenerateMaze = useCallback(() => {
    setMazeWalls(mazeGenerator(height, width));
  }, [height, width]);

  return [mazeWalls || {}, forceGenerateMaze];
};
