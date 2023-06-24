export function unserialize(data: string): any {
  const utf8Overhead = function (chr: string): number {
    const code = chr.charCodeAt(0);
    if (code < 0x0080) {
      return 0;
    }
    if (code < 0x0800) {
      return 1;
    }
    return 2;
  };

  const error = function (type: string, msg: string, filename: string, line: number): void {
    throw new (window as any)[type](msg, filename, line);
  };

  const read_until = function (data: string, offset: number, stopchr: string): [number, string] {
    let i = 2, buf: string[] = [], chr = data.slice(offset, offset + 1);

    while (chr !== stopchr) {
      if ((i + offset) > data.length) {
        error('Error', 'Invalid', '', 0);
      }
      buf.push(chr);
      chr = data.slice(offset + (i - 1), offset + i);
      i += 1;
    }
    return [buf.length, buf.join('')];
  };

  const read_chrs = function (data: string, offset: number, length: number): [number, string] {
    let i, chr, buf: string[];

    buf = [];
    for (i = 0; i < length; i++) {
      chr = data.slice(offset + (i - 1), offset + i);
      buf.push(chr);
      length -= utf8Overhead(chr);
    }
    return [buf.length, buf.join('')];
  };

  const _unserialize = function (data: string, offset: number): [string, number, any] {
    let dtype, dataoffset, keyandchrs, keys, contig,
      length, array, readdata, readData, ccount,
      stringlength, i, key, kprops, kchrs, vprops,
      vchrs, value, chrs = 0,
      typeconvert = function (x: any) {
        return x;
      };

    if (!offset) {
      offset = 0;
    }
    dtype = (data.slice(offset, offset + 1)).toLowerCase();

    dataoffset = offset + 2;

    switch (dtype) {
      case 'i':
        typeconvert = function (x: string) {
          return parseInt(x, 10);
        };
        readData = read_until(data, dataoffset, ';');
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case 'b':
        typeconvert = function (x: string) {
          return parseInt(x, 10) !== 0;
        };
        readData = read_until(data, dataoffset, ';');
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case 'd':
        typeconvert = function (x: string) {
          return parseFloat(x);
        };
        readData = read_until(data, dataoffset, ';');
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case 'n':
        readdata = null;
        break;
      case 's':
        ccount = read_until(data, dataoffset, ':');
        chrs = ccount[0];
        stringlength = ccount[1];
        dataoffset += chrs + 2;

        readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 2;
        if (chrs !== parseInt(stringlength, 10) && chrs !== readdata.length) {
          error('SyntaxError', 'String length mismatch', '', 0);
        }
        break;
      case 'a':
        readdata = {};

        keyandchrs = read_until(data, dataoffset, ':');
        chrs = keyandchrs[0];
        keys = keyandchrs[1];
        dataoffset += chrs + 2;

        length = parseInt(keys, 10);
        contig = true;

        for (i = 0; i < length; i++) {
          kprops = _unserialize(data, dataoffset);
          kchrs = kprops[1];
          key = kprops[2];
          dataoffset += kchrs;

          vprops = _unserialize(data, dataoffset);
          vchrs = vprops[1];
          value = vprops[2];
          dataoffset += vchrs;

          if (key !== i)
            contig = false;

          (readdata as { [key: string]: any })[key] = value;
        }

        if (contig) {
          array = new Array(length);
          for (i = 0; i < length; i++)
            array[i] = readdata[i];
          readdata = array;
        }

        dataoffset += 1;
        break;
      default:
        error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype, '', 0);
        break;
    }
    return [dtype, dataoffset - offset, typeconvert(readdata)];
  };

  return _unserialize((data + ''), 0)[2];
}

export const formatTime = ({
  hours, minutes, seconds
}: {
  hours: number | string, minutes: number | string, seconds: number | string
}) => {
  if (typeof hours === 'string') {
    hours = parseInt(hours, 10);
  }
  if (typeof minutes === 'string') {
    minutes = parseInt(minutes, 10);
  }
  if (typeof seconds === 'string') {
    seconds = parseInt(seconds, 10);
  }
  const h = hours < 10 ? '0' + hours : hours;
  const m = minutes < 10 ? '0' + minutes : minutes;
  const s = seconds < 10 ? '0' + seconds : seconds;
  return `${h}:${m}:${s}`;
}
